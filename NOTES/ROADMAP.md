# Roadmap

Below is a roadmap of potential Terrafarm features and releases.

## 0.2

Minimal feature-set for first public release.

### Interface

Basic user experience.

#### Stories
- [ ] member offers resource to group modal
  - [ ] hours per week field
  - [ ] group owner notified of offer
    - [ ] show alert next to group on profile page
  - [ ] group owner approves/declines offer
    - [ ] show pending resource on group page with approve/decline button

#### Group Page
- [ ] location
- [ ] requirements
- [ ] pending users
  - [ ] show **None** if list is empty
- [ ] pending resources
  - [ ] show **None** if list is empty
- [ ] allocate resources modal
  - [ ] if group owner -> 'add resource' button
  - [ ] else if member -> 'offer resource' button

#### About Page
- [ ] 'Links' list with icons

#### Other
- [ ] remove renameResource mutation
- [ ] text input edit, save, cancel interactions
- [ ] spinners
- [ ] tabindex on nav button
- [ ] logo, image, keywords, author for `./package.json`
- [ ] favicon
- [ ] bump dependencies, maybe node
- [ ] document Fieldbook
- [ ] google analytics
- [ ] update `./CHANGELOG`
- [ ] 'Groups' -> 'Spaces' ?

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
- [ ] add formsy-react
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

