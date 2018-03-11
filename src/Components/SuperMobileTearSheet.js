import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';

  const SuperMobileTearSheet = () => (

      <List>
        <ListItem
          leftAvatar={<Avatar icon={<FileFolder />} />}
          rightIcon={<ActionInfo />}
          primaryText={this.props.name + " - " + this.props.age}
          secondaryText={this.props.sport}
        />
      </List>


  );
export default SuperMobileTearSheet;