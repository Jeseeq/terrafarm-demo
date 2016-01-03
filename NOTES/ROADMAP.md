# Roadmap

Below is a roadmap of potential Terrafarm features and releases.

## 0.2

First public release.

### Interface

More detail on basic user experience patterns.

#### Stories
- [ ] remove renameResource mutation
- [ ] new resource modal
- [ ] new group modal
  - [ ] name field
  - [ ] space field
    - [ ] location
    - [ ] pictures
  - [ ] requirements field
- [ ] member offers resource to group modal
  - [ ] hours per week field
  - [ ] group owner notified of offer
    - [ ] show alert next to group on profile page
  - [ ] group owner approves/declines offer
    - [ ] show pending resource on group page with approve/decline button

#### Profile Page
- [ ] 'edit' buttons
- [ ] 'new' buttons
- [ ] color icons

#### Resource Page
- [ ] icon next owner name
- [ ] description
- [ ] category
- [ ] pictures

#### Group Page
- [ ] location
- [ ] pictures
- [ ] requirements
- [ ] pending users
  - [ ] show **None** if list is empty
- [ ] pending resources
  - [ ] show **None** if list is empty
- [ ] allocate resources modal
  - [ ] if group owner -> 'add resource' button
  - [ ] else if member -> 'offer resource' button

#### Home Page
- [ ] shadows

#### About Page
- [ ] 'Links' list with icons

#### Other
- [ ] text input edit, save, cancel interactions
- [ ] css feature detection, fallbacks, and browser warnings
- [ ] logo, image, keywords, author for `./package.json`
- [ ] favicon
- [ ] bump dependencies, maybe node
- [ ] document Fieldbook
- [ ] spinners
- [ ] crowdfunding
- [ ] google analytics
- [ ] tabindex on nav button

### Database
- [ ] Authentication with Auth0 JWT
- [ ] catch redundant connection mutations
- [ ] fewer calls to `getEndpoint`
- [ ] consolidate `data/api/` into one module
- [ ] resolve benign console warnings on mutations


## 0.3

### Interface

Improve the user experience.

#### Edit/New Resource Modal
- [ ] resolve console warnings
- [ ] add formsy-react
- [ ] category dropdown
  - [ ] equipment
    - [ ] pictures
  - [ ] labor
  - [ ] seeds
  - [ ] compost

#### Browse Page
- [ ] tables
  - [ ] responsive height
  - [ ] sort and tooltip
  - [ ] checkboxes and multiple selection

#### User Stories
- [ ] add message to membership and resource requests
- [ ] group defines resource needs
- [ ] user defines resource availability

#### New Resource Page
- [ ] pre-populated list of common resources with filter menu

#### Routes
- [ ] URL parameter values (query keys) should be descriptive
- [ ] transitions
- [ ] https?

#### Tests
- [x] Jest
- [ ] unit
- [ ] end-to-end
- [ ] chaos monkey (and add documentation)

#### Other
- [ ] styles sanity and patterns

### Database
- [ ] parallel requests
- [ ] load testing
- [ ] optimistic updates


## 0.4

### Interface

Improve the user experience.

#### Research Groups
- [ ] reading lists

#### New Resource Page
- [ ] predictive text field for naming resource
- [ ] category field
