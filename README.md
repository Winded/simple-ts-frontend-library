# simple-ts-frontend-library

This library consists of simple utilities for TypeScript frontend applications.
No runtime dependencies.

These are made for my own purposes and they are intended to be less general-purpose and more simple
compared to popular libraries and frameworks.

## state

Simple state manager for application state. State is immutable and can be "replaced"
with `setState`. Callback is invoked when state changes.

## router

Non-hash routing for single-page applications. Routes are matched with regular expression.
Parameters for routes are captured from the regular expression groups.

`notfound` is a special identifier for resolved route that was not found.

## element-hooks

Process DOM node trees and look for specified element names. These element names will
trigger specified functions, passing the element as parameter. The function should return
a boolean indicating whether we want to continue to inspect the node's children or not.

You can use this to build a component-based application with native HTML elements.

## di-container

Dependency injection container. Makes it easier to do dependency injection.

The container is configured with providers, which provide an implementation
for a given token. A token instance has an identifier, so you need to use
the same token instance with both provider and when getting the dependency.
