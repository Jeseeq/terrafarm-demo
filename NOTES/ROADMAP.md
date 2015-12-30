# Roadmap

Below is a roadmap of potential Terrafarm features and releases.

## 0.1

Demo version which runs locally.

### UI Design

#### Resource Page
- [ ] new layout/style for user name

#### Sanity

### General
- [ ] GitHub release tags


## 0.2

First public release.

### Documentation
- [ ] project website

### UI Design

More detail on basic user experience patterns.

#### User Stories
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

#### User Profile
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

#### Group Page
- [ ] group description

#### Testing
Attempt full test coverage.
- [ ] unit tests
- [ ] end-to-end test
- [ ] chaos monkey (and add documentation)

#### Other
- [ ] css feature detection, fallbacks, and browser warnings
- [ ] route transitions

### Database Design
- [ ] Authentication with Auth0 JWT
- [ ] parallel db requests
- [ ] avoid redundant connection mutations
- [ ] fewer calls to `getEndpoint`
- [ ] consolidate `data/api/` into one module
- [ ] resolve benign console warnings on mutations

### Tooling
- [ ] heroku deployment


## 0.3

### UI Design

Expand the user experience.

#### User Stories
- [ ] add message to membership and resource requests
- [ ] group defines resource needs
- [ ] user defines resource availability

#### New Resource Page
- [ ] pre-populated list of common resources with filter menu

#### Routes
- [ ] URL parameter values (query keys) should be descriptive

### Database Design
- [ ] dev db and caching
- [ ] optimistic updates


## 0.4

### UI Design

Enhance the user experience.

#### New Resource Page
- [ ] predictive text field for naming resource
- [ ] category field
