"""
Provide a class User to deal with virtual class users.
"""

import os, os.path, re

class User:

    def __init__ (self):
        self.firstname      = None
        self.lastname       = None
        self.email          = None
        self.exists         = None
        self.login          = None
        self.password       = None
        self.external_auth  = None
        self.agreecgu       = None
        return

    def __repr__(self):
        return "User object ({0.firstname}, {0.lastname}, {0.email}, {0.exists}, {0.login}, {0.password}, {0.external_auth}, {0.agreecgu})".format(self)
    
def readUsers(classpath):
    """
    Creates a list of users of an existing virtual classroom
    @param classpath the path to the files of the class.
    """
    result={}
    with open(os.path.join(classpath, ".userlist"), encoding="latin-1") as userlist:
        for l in userlist.readlines():
            m=re.match(r":(.*),(.*),(.*)", l.strip())
            if m:
                u=User()
                u.lastname=m.group(1)
                u.firstname=m.group(2)
                u.login=m.group(3)
                result[u.login]=u
    for f in os.listdir(os.path.join(classpath, ".users")):
        path=os.path.join(classpath, ".users",f)
        if os.path.isfile(path) and f[0] != ".":
            with open(path, encoding="latin-1") as userfile:
                userdict={}
                for l in userfile.readlines():
                    m=re.match(r"!set user_([^=]+)=(.*)", l.strip())
                    if m:
                        userdict[m.group(1)]=m.group(2)
            # check whether there is already a user with the same
            # login in result
            if "external_auth" in userdict:
                pattern=re.compile("^"+userdict["external_auth"]+"$")
                possibleKeys=[k for k in result if pattern.match(k)]
                if possibleKeys:
                    u=result[possibleKeys[0]]
                    if u.lastname==userdict["lastname"] and u.firstname==userdict["firstname"]:
                        # same user detected : enrich this user with userdict
                        for k in userdict:
                            setattr(u, k, userdict[k])
            else: # external_auth not in userdict
                raise Exception('Not yet implemented', 'external_auth is not in user\'s data file')
                            
    return result
            


if __name__ == "__main__":
    users=readUsers('classe')
    print(users)
