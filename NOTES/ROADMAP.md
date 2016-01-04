# Roadmap

Below is a roadmap of potential Terrafarm features and releases.

## 0.2

Minimal feature-set for first public release.

### Interface

Basic user experience.

#### Stories
- [ ] form validation
  - [ ] new user
  - [ ] new/edit resource
  - [ ] new/edit resource offer
  - [ ] new/edit group

#### Group Page
- [ ] member approves/declines membership request
- [ ] member approves/declines resource offer

#### Other
- [ ] spinners
- [ ] logo, image for `./package.json`
- [ ] favicon
- [ ] bump dependencies, maybe node
- [ ] document Fieldbook
- [ ] google analytics

### Database
- [ ] Authentication with Auth0 JWT
- [ ] catch redundant connection mutations
- [ ] fewer calls to `getEndpoint`
- [ ] consolidate `data/api/` into one module
- [ ] resolve benign console warnings on mutations


## 0.3

### Interface

High-priority additions and improvements to the user experience.

#### User Stories
- [ ] add message to membership and resource requests
- [ ] group defines resource needs
- [ ] user defines resource availability

#### Edit/New Resource Modal
- [ ] resolve console warnings
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

#### Browse Page
- [ ] tables
  - [ ] responsive height
  - [ ] sort and tooltip
  - [ ] checkboxes and multiple selection

#### Resource Page
- [ ] pictures

#### Group Page
- [ ] pictures
- [ ] offer resource
  - [ ] hours per week field

#### Home Page
- [ ] shadows

#### Routes
- [ ] URL parameter values (query keys) should be descriptive
- [ ] transitions
- [ ] https?

#### Tests
- [ ] ???
- [ ] chaos monkey (and add documentation)

#### Style
- [ ] theme
- [ ] class composition
- [ ] css feature detection, fallbacks, and browser warnings

### Database
- [ ] parallel requests
- [ ] load testing
- [ ] optimistic updates


## 0.4

### Interface

Low-priority additions and improvements to the user experience.

#### Research Groups
- [ ] reading lists

#### New Resource Page
- [ ] predictive text field for naming resource

#### About Page
- [ ] crowdfunding link

#### Profile Page
- [ ] show alert next to group with pending actions

