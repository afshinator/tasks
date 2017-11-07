// api.js

// Fetch api data and set state accordingly
//  url - full url to api
//  that - Context of the calling Component/Class;  the 'this' pointer for setState()

export const fetchData = (url, that) => {
  that.setState({ isLoading: true, hasLoadedTasks: false, errorLoadingTasks: false,
    hasSavedTasks: false, errorSavingTasks: false
  }, () => {
    fetch(url) // basic fetch without options does a GET
      .then(response => {
        if (!response.ok) {
          console.warn("Load error: " + response.statusText);
          throw Error(response.statusText);
        }
        that.setState({ isLoading: false }); // data loaded, let rest of app know
        return response;
      })
      .then(response => response.json())
      .then(obj => {
        // Happy case
        let loadedTasksList;

        // If empty tasks list or data not in format expected, create empty list
        if (obj.tasks === null || !obj.tasks) {
          loadedTasksList = []; // Internal data-structure of tasks list is an array of objects
        } else {
          loadedTasksList = obj.tasks;
        }
        that.setState({ tasks: loadedTasksList, hasLoadedTasks: true }, () => {
          console.log("Loaded data: ", loadedTasksList );
        });
      })
      .catch(() => that.setState({ isLoading: false, errorLoadingTasks: true }));
  });
};


// POST api data and set state accordingly
//
export const setTasks = (url, data, that) => {
  that.setState({ isSaving: true, hasSavedTasks: false, errorSavingTasks: false,
    hasLoadedTasks: false, errorLoadingTasks: false
  }, () => {
    // console.log('Trying to save ', data);
    fetch(url, {
      method: "post",
      headers : new Headers(),
      body: JSON.stringify({ tasks: data })
    })
      .then(response => {
        if (!response.ok) {
          console.warn("Save error: " + response.statusText);
          throw Error(response.statusText);
        }
        that.setState({ isSaving: false }); // data saved, let rest of app know
        return response;
      })
      .then( (response) => {
        console.log('successful save, ==> ', response );
        that.setState({ isSaving: false, hasSavedTasks: true, errorSavingTasks: false,});
      })
      .catch( (err) => {
        that.setState({ isSaving: false, errorSavingTasks: true, tasksDirty: true })
      });
  });
};
