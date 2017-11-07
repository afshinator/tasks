# Lil' Task app
##### A list of ordered tasks that can be saved and loaded over the net.

- - -
##### Technologies
**Redux** - is nice as an app gets a bit complex, when you have to share state across components that are in different branches so its not as simple as passing props, or when you would like easy state rollback...   I chose not to use redux in this little app.

**CSS** - I chose Tachyon library because I wanted to try it, and then there are over-rides with inline styling.  You'll see the Tachyons classes on many components.  As I got to know the Tachyons naming conventions I'm liking it more and more.




---
- Should the Save button be enabled after adding new task (which will be empty),  and related question, should you be able to save a list of empty tasks?

  I guess **Yes**; because according to specs:
    "Save button... Is set enabled when current state of the list doesn’t match it’s initial state (task has been added, deleted, or updated)",
