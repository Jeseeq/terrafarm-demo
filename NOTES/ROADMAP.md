# Roadmap

Below is a roadmap of potential Terrafarm features and releases.

## 0.2
- [ ] spinners

## 0.3

### Interface

High-priority additions and improvements to the user experience.

#### User Stories
- [ ] add message to membership and resource requests
- [ ] remove resource from group

#### Edit/New Resource Modal
- [ ] category dropdown
  - [ ] equipment
    - [ ] pictures
  - [ ] labor
    - [ ] hours
    - [ ] skill level
  - [ ] materials
    - [ ] pictures
  - [ ] seeds
    - [ ] weight
  - [ ] compost
    - [ ] weight

#### Edit/New Group Modal
- [ ] location
- [ ] size
- [ ] category dropdown
  - [ ] yard
  - [ ] vacant lot
  - [ ] indoor
  - [ ] rooftop
- [ ] pictures

#### Resource Page
- [ ] pictures

#### Group Page
- [ ] pictures

#### Home Page
- [ ] shadows

#### Routes
- [ ] transition animations

#### Tests
- [ ] `./js/actions/*`
- [ ] chaos monkey (and add documentation)

#### Style
- [ ] theme
- [ ] class composition
- [ ] css feature detection, fallbacks, and browser warnings

### Database
- [ ] Authentication with Auth0 JWT
- [ ] optimistic updates


## 0.4

### Interface

Low-priority additions and improvements to the user experience.

#### Research Groups
- [ ] reading lists

#### Group Page
- [ ] resource needs

#### Resource Page
- [ ] resource availability

#### New Resource Page
- [ ] predictive text field for naming resource

#### About Page
- [ ] crowdfunding link

#### Profile Page
- [ ] show alert next to group with pending actions

#### Browse Page
- [ ] tables
  - [ ] responsive height
  - [ ] sort and tooltip
  - [ ] checkboxes and multiple selection

#### Main Menu
- [ ] alternative icon style if active page

### Database
- [ ] consolidate `data/api/` into one module
- [ ] fewer calls to `getEndpoint`
- [ ] parallel requests
- [ ] load testing

### Other
- [ ] clean up styles
  - [ ] move shared-styles
  - [ ] add `shared-styles/global.css`
- [ ] form validation
  - [ ] new user
  - [ ] new/edit resource
  - [ ] new/edit resource offer
  - [ ] new/edit group
- [ ] tests
  - [ ] actions
  - [ ] components
  - [ ] elements
- [ ] bump dependencies, maybe node
- [ ] `./package.json` logo, image, or icon
- [ ] favicon
- [ ] clean up console warnings
- [ ] URL parameter values (query keys) should be descriptive
- [ ] https?
