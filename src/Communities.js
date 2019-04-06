import React, { Component } from 'react';
import * as contentful from 'contentful';
import Community from './components/Community';

export default class Communities extends Component {
  constructor(props) {
    super(props)

    this.state = {
      communities: [],
    }
  }

  componentDidMount() {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE,
      accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN 
    })

    client.getEntries().then(entries => {
      const communities = entries.items.map(community => community.fields);
      this.setState({
        communities
      })
    })
  }

  render() {
    return (
      <div className="CommunityList">
       {this.renderCommunities()}
      </div>
    );
  }

  renderCommunities() {
    return this.state.communities.map(community => 
      <Community key={community.name} {...community} />)
  }
}
