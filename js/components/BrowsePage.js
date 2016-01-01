import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

const styles = {
  tab: {
    fontSize: 17,
    letterSpacing: 0.3,
  },
};

class BrowsePage extends React.Component {
  render () {
    const {master} = this.props;
    const {users, resources, groups} = master;

    return <div>
      <h2>Browse</h2>
      <Tabs secondary>
        <Tab label={'Users'} style={styles.tab}>
          <Table height={'425'} fixedHeader fixedFooter selectable={false} >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
              <TableRow>
                <TableHeaderColumn tooltip={'Sort by ID'}>ID</TableHeaderColumn>
                <TableHeaderColumn tooltip={'Sorty by Name'}>Name</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover stripedRows displayRowCheckbox={false} >
              {users.edges.map(edge => <TableRow key={edge.node.id}>
                <TableRowColumn>
                  {edge.node.id}
                </TableRowColumn>
                <TableRowColumn>
                  <Link to={`/user/${edge.node.id}`}>{edge.node.name}</Link>
                </TableRowColumn>
              </TableRow>)}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableRowColumn>ID</TableRowColumn>
                <TableRowColumn>Name</TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </Tab>
        <Tab label={'Resources'} style={styles.tab}>
          <ul>
            {resources.edges.map(edge => <li key={edge.node.id}>
              <Link to={`/resource/${edge.node.id}`}>{edge.node.name}</Link>
            </li>)}
          </ul>
        </Tab>
        <Tab label={'Groups'} style={styles.tab}>
          <ul>
            {groups.edges.map(edge => <li key={edge.node.id}>
              <Link to={`/group/${edge.node.id}`}>{edge.node.name}</Link>
            </li>)}
          </ul>
        </Tab>
      </Tabs>
    </div>;
  }
}

export default Relay.createContainer(BrowsePage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        users(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        resources(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
        groups(first: 18) {
          edges {
            node {
              id,
              name,
            }
          }
        },
      }
    `,
  },
});
