## Introduction

This technical excercise involved creating a React based product display similar to what you would find on e-commerce websites, but with a focus on accordion-UI styling. I chose to implement a horizontal accordion-UI style due to its more elegant implementation and seamless animations. I had a lot of fun working with animations and transitions with this one! Hope you enjoy it too.

Some of the main technologies used include React, React-DOM, MaterialUI, ImmutableJS, Jest, Redux, Redux-Thunk, Axios & React Prop-Types.

## Folder Structure

The unit tests were all performed in the Layout.test.js file since that's where almost all of the rendering logic is managed.

```
products_with_accordion_ui
| package.json
| README.md
|__public
|
|__src
|    |_components
|                | ItemCategories
|                | ItemGroups
|                | Items
|                      | Item
|                      | ItemVariants
|_containers
|           | __test__
|                     | Layout.test.js
|
|_store
|      | actions
|      | reducers
|
|_utilities
          | ClosePanelButton
          | ErrorBoundary
```

## How to run

1. cd into the project directory
2. type "npm start" in your terminal to start the application and "npm test" to run the unit tests
3. You're good to go!

If you have any feedback, i'd be happy to hear back from you. With that, i'll be signing off. Cheers!
