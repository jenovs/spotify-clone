import React from 'react';

import { Card, Clipart, Title, Wrapper } from './styled';

class GenreCard extends React.Component {
  state = {
    hover: false,
  };

  handleMouseOver = () => {
    this.setState(() => ({ hover: true }));
  };

  handleMouseLeave = () => {
    this.setState(() => ({ hover: false }));
  };

  render() {
    const { hover } = this.state;
    const { href, icons, name } = this.props;

    return (
      <Wrapper>
        <Card
          onClick={() => console.log(href)}
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        >
          <Clipart hover={hover} icon={icons[0].url} />
          <Title>{name}</Title>
        </Card>
      </Wrapper>
    );
  }
}

export default GenreCard;
