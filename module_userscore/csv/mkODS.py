#!/usr/bin/python3

import subprocess, os

sdir=os.environ['w_wims_home']+'/'+os.environ['w_wims_sesdir']
os.makedirs(sdir+'/getfile', exist_ok=True)
ifilename=sdir+'/'+os.environ['w_infile']
ofilename=sdir+'/getfile/'+os.environ['w_outfile']
## this is weird: os.environ['w_outfile'] must be stripped,
## if I don't do it, the filename contains terminal blank spaces
os.rename(ifilename.strip(),ofilename.strip())
