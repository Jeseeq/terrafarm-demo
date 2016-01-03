# Roadmap

Below is a roadmap of potential Terrafarm features and releases.

## 0.2

First public release.

### Interface

More detail on basic user experience patterns.

#### Stories
- [ ] group member creates membership invitation
- [ ] user offers resource to group
  - [ ] auto-create membership request
  - [ ] group member approves/declines resource offer
    - [ ] show alert next to group on profile page
    - [ ] show pending resource on group page with approve/decline button
- [ ] group requests resource from user
  - [ ] auto-create membership invitation
  - [ ] user approves/declines resource request
    - [ ] show alert next to resource on profile page
    - [ ] show pending group on resource page with approve/decline buttons
- [ ] about page
  - [ ] recommended reading

#### Profile Page
- [ ] color icons layout
- [ ] location
- [ ] edit user details

#### New Resource Page
- [ ] field for name
- [ ] field for description

#### New Group Page
- [ ] field for name
- [ ] field for description

#### Resource Page
- [ ] resource description
- [ ] new layout/style for user name

#### Group Page
- [ ] group description
- [ ] group growing, cultivation plan
- [ ] only show 'pending users' heading if there is a list
- [ ] only show 'my resources' which aren't already allocated
- [ ] show resource requests

#### Home Page
- [ ] shadows

#### About Page
- [ ] 'Links' list with icons

#### Tests
- [x] Jest
- [ ] unit
- [ ] end-to-end
- [ ] chaos monkey (and add documentation)

#### Other
- [ ] text input edit, save, cancel interactions
- [ ] css feature detection, fallbacks, and browser warnings
- [ ] logo, image, keywords, auther for and `./package.json`
- [ ] favicon
- [ ] bump dependencies, maybe node
- [ ] document Fieldbook
- [ ] Google Analytics
- [ ] spinner
- [ ] crowdfunding
- [ ] google analytics
- [ ] tabindex on nav button

### Database
- [ ] Authentication with Auth0 JWT
- [ ] parallel db requests
- [ ] avoid redundant connection mutations
- [ ] fewer calls to `getEndpoint`
- [ ] consolidate `data/api/` into one module
- [ ] resolve benign console warnings on mutations
- [ ] dev vs heroku db and caching
- [ ] optimistic updates


## 0.3

### UI Design

Improve the user experience.

#### Browse Page Tables
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

### Refactor Styles
- [ ] sanity


## 0.4

### UI Design

Improve the user experience.

#### New Resource Page
- [ ] predictive text field for naming resource
- [ ] category field
