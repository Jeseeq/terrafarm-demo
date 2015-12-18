# Roadmap

Below is a roadmap of potential Terrafarm features and releases.

## 0.1

Demo version which runs locally.

### Documentation
- [ ] project website
- [ ] chaos monkey

### UI Design
- [x] [codrops/PerspectivePageViewNavigation](https://github.com/codrops/PerspectivePageViewNavigation).
  - [ ] fix content wrapper scroll position
- [x] [codrops/CreativeGooeyEffects](https://github.com/codrops/CreativeGooeyEffects).
- [ ] if not logged in, show login, else show logout
- [ ] style normalize or sanitize
- [ ] simple page layouts


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
Add (almost) full test coverage.
- [ ] unit tests
- [ ] end-to-end test

#### Other
- [ ] css feature detection and fallbacks
- [ ] route transitions

### Database Design
- [ ] replace mock database with a real db API [Fieldbook](https://fieldbook.com/books)
- [ ] Authentication with Auth0 JWT

### Tooling
- [ ] heroku deployment


## 0.3

### UI Design

#### Routes
- [ ] URL parameter values (query keys) should be descriptive
