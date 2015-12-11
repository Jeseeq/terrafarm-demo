# Roadmap

Below is a roadmap of potential Terrafarm features and releases.

## 0.1

Demo version which runs locally.

### Documentation

Define the core [practices](https://github.com/linuxfoundation/cii-best-practices-badge) and standards.

- [x] app description
- [x] installation
- [x] running
- [ ] developing
  - [ ] add directory-specific READMEs and TEMPLATEs
- [x] contributing
- [x] license
- [ ] roadmap

### UI Design

Build out and style the user interface for the most basic use cases.

#### Tech and Architecture
Establish the frontend technology stack and architecture patterns.
- [x] React
- [x] `components/` fetch data and import other `components/` and `elements/`
- [x] `elements/` receive low-level data, may have state, and import other `elements/` and third-party "components".
- [x] Relay + GraphQL
- [x] Babel
- [x] ES6
- [x] CSS Modules

#### User Stories
- [x] login
- [x] create new user
- [x] create new resource
- [x] create new group
- [x] viewer profile details
- [x] other user profiles
- [x] resource details
- [x] group details
- [x] viewer requests group membership
  - [x] group member approves or denies new membership request
- [x] group member commits a resource to the group

#### Menu
A menu which combines the effects in these demos:
- [x] [codrops/PerspectivePageViewNavigation](https://github.com/codrops/PerspectivePageViewNavigation).
- [ ] [codrops/CreativeGooeyEffects](https://github.com/codrops/CreativeGooeyEffects).

#### Other
- [ ] normalize styles
- [ ] simple page layouts
- [ ] typography

### Database Design

Use a javascript file as a mock database.

#### Types
- [x] User
- [x] Resource
- [x] Group
- [x] Master
- [x] Viewer

#### Mutations
- [x] authenticate viewer
- [x] create new user
- [x] create new resource
  - [x] new edge on viewer
  - [x] new edge on master
- [x] create new group
  - [x] new edge on viewer
  - [x] new edge on master
- [x] create new pending member
  - [x] new edge on user
  - [x] new edge on group
- [x] connect user and group
  - [x] new edge on user
  - [x] new edge on group
  - [x] delete pending user edge on group
  - [x] delete pending group edge on user
- [x] connect resource and group
  - [x] new edge on resource
  - [x] new edge on group

### Tooling

- [ ] ESLint
- [ ] `npm restart`

## 0.2

First public release.

### UI Design

Expand and enhance the user experience.

#### User Stories
- [ ] group member creates membership invitation
- [ ] user offers resource to group
  - [ ] auto-create membership request
  - [ ] group member approves/declines resource offer
- [ ] group requests resource from user
  - [ ] auto-create membership invitation
  - [ ] user approves/declines resource request
- [ ] about page
  - [ ] recommended reading

#### Testing
Add full test coverage.
- [ ] unit tests
- [ ] end-to-end test

#### Other
- [ ] css feature detection and fallbacks
- [ ] route transitions

### Database Design

Replace mock database with a real database.

#### Tech and Architecture
Research and choose a proper database technology and architecture which gives 
us a simple `getItem(type, id)` API. Consider postgresql, mongoose, and flask.
- [ ] ???

#### Authentication
- [ ] Auth0 JWT

### Tooling

- [ ] heroku deployment
