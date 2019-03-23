import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import withStyles from 'react-jss';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import ReactLoading from 'react-loading';

class Image extends React.Component {
  state = {
    loaded: false
  };
  afterLoad = () => {
    this.setState({ loaded: true });
  };
  render() {
    const { src, width, height, alt, placeholder, className, ...otherProps } = this.props;
    const placeholderClass = this.state.loaded ? '' : className;
    return (
      <div style={{ position: 'relative' }}>
        <LazyLoadImage
          width={width}
          height={height}
          alt={alt}
          effect="opacity"
          src={src}
          afterLoad={this.afterLoad}
          wrapperClassName={placeholderClass}
          placeholderSrc={placeholder}
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
