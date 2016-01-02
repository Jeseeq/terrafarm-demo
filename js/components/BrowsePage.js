import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-header';
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
          <Table height={'425'} fixedHeader selectable={false} >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn colSpan={2}>Name</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover stripedRows displayRowCheckbox={false} >
              {users.edges.map(edge => <TableRow key={edge.node.id}>
                <TableRowColumn>
                  <Link to={'/user/' + edge.node.id}>
                    {edge.node.name}
                  </Link>
                </TableRowColumn>
              </TableRow>)}
            </TableBody>
          </Table>
        </Tab>
        <Tab label={'Resources'} style={styles.tab}>
          <Table height={'425'} fixedHeader selectable={false} >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn colSpan={2}>Name</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover stripedRows displayRowCheckbox={false} >
              {resources.edges.map(edge => <TableRow key={edge.node.id}>
                <TableRowColumn>
                  <Link to={'/resource/' + edge.node.id}>
                    {edge.node.name}
                  </Link>
                </TableRowColumn>
              </TableRow>)}
            </TableBody>
          </Table>
        </Tab>
        <Tab label={'Groups'} style={styles.tab}>
          <Table height={'425'} fixedHeader selectable={false} >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn colSpan={2}>Name</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover stripedRows displayRowCheckbox={false} >
              {groups.edges.map(edge => <TableRow key={edge.node.id}>
                <TableRowColumn>
                  <Link to={'/group/' + edge.node.id}>
                    {edge.node.name}
                  </Link>
                </TableRowColumn>
              </TableRow>)}
            </TableBody>
          </Table>
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

