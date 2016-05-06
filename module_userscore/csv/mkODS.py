#!/usr/bin/python3

import os, re

sdir=os.environ['w_wims_home']+'/'+os.environ['w_wims_sesdir']
os.makedirs(sdir+'/getfile', exist_ok=True)
ifilename=sdir+'/'+os.environ['w_infile']
ofilename=sdir+'/getfile/'+os.environ['w_outfile']
## this is weird: os.environ['w_outfile'] must be stripped,
## if I don't do it, the filename contains terminal blank spaces
ofilename=ofilename.strip()

try:
   from odf.opendocument import OpenDocumentSpreadsheet
   from odf.style import Style, TextProperties, ParagraphProperties
   from odf.style import TableColumnProperties
   from odf.text import P
   from odf.table import Table, TableColumn, TableRow, TableCell
except:
   with open(ofilename,"w",encoding="latin-1") as output:
      output.write('"WARNING: the webmaster did not install the package python3-odf (also known as pyodf), so the file contents are just in CSV format";"Please install python3-odf";"take a look at https://packages.debian.org/stretch/python3-odf"\n')
      with open(ifilename,"r",encoding="latin-1") as infile:
         lines=infile.readlines()
         for l in lines:
            output.write(l)
   sys.exit(0)
   
def parseFloat(val):
   try:
       value=float(val)
       return (True, value)
   except:
       pass
   return (False, 0)

# remove the .ods suffix if any, as ODF will ad one
m=re.match(r"^(.*)\.ods$", ofilename.strip())
if m:
    ofilename=m.group(1)
    

doc = OpenDocumentSpreadsheet()
# Start the table, and describe the columns
table = Table(name="Password")

f = open(ifilename,"r",encoding="latin-1")
for line in f:
    rec = line.strip().split(";")
    tr = TableRow()
    table.addElement(tr)
    for val in rec:
        m=re.match(r'"(.*)"', val)
        if m:
            val=m.group(1)
        isnumber,value = parseFloat(val)
        if isnumber:
            tc=TableCell(value=value, valuetype="float")
        else:
            tc = TableCell()
        tr.addElement(tc)
        p = P(text=val)
        tc.addElement(p)

doc.spreadsheet.addElement(table)
doc.save(ofilename, True)
