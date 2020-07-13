import os
import shutil

def addBGScript():
    bg_script = '/home/walker/workspace/projects/merch_complete/background.js'
    build_dir = os.getcwd() + '/build'

    if not (os.path.exists(bg_script)):

        return False
    
    shutil.copy(bg_script, build_dir)
    return True

print('Added background script' if addBGScript() else 'Background script not added')
