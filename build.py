import os
import shutil

def addBGScript():
    scripts = [
        '/home/walker/workspace/projects/mi_ext_view/background.js',
        '/home/walker/workspace/projects/mi_ext_view/inject.js',
        '/home/walker/workspace/projects/mi_ext_view/process.js',
    ]
    
    build_dir = os.getcwd() + '/build'

    for script in scripts:
        shutil.copy(script, build_dir)
    
    return True

print('Added background script' if addBGScript() else 'Background script not added')
