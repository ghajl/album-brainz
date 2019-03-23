import React from 'react';
import withStyles from 'react-jss';
import ReactLoading from 'react-loading';

class Image extends React.Component {
  state = {
    loaded: false
  };
  afterLoad = () => {
    this.setState({ loaded: true });
  };
  render() {
    const { src, width, height, alt, className, ...otherProps } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <img
          src={src}
          width={width}
          height={height}
          alt={alt}
          onLoad={this.afterLoad}
          onError={this.afterLoad}
          {...otherProps}
        />
        {!this.state.loaded && (
          <ReactLoading
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fill: '#f00',
              width: 20
            }}
            type="spin"
          />
        )}
      </div>
    );
  }
}
export default Image;
