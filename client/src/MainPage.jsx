import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import Gallery from "./Gallery";
import data from "./resources/data";
import deathOverlay from "./resources/death-overlay.png";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      images: this.props.images,
      dead: this.filterDead(this.props.images),
      submitted: false
    };

    console.log(this.state.dead);

    this.onSelectImage = this.onSelectImage.bind(this);
    this.putDataToDB = this.putDataToDB.bind(this);
  }

  tileViewportStyle() {
    var nanoBase64Backgorund = {};
    if (this.props.item.nano) {
      nanoBase64Backgorund = {
        background: `url(${this.props.item.nano})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      };
    }
    if (this.props.item.isSelected)
      return Object.assign(
        {
          width: this.props.item.vwidth - 32,
          height: this.props.height - 32,
          margin: 16,
          overflow: "hidden"
        },
        nanoBase64Backgorund
      );
    return Object.assign(
      {
        width: this.props.item.vwidth,
        height: this.props.height,
        overflow: "hidden"
      },
      nanoBase64Backgorund
    );
  }

  onSelectImage(index, image) {
    var images = this.state.images.slice();
    var img = images[index];
    if (img.hasOwnProperty("isSelected")) img.isSelected = !img.isSelected;
    else img.isSelected = true;

    img.dead = img.isSelected;

    this.setState({
      images: images,
      dead: this.filterDead(images)
    });
  }

  filterDead(images) {
    var dead = images.filter(function(itm) {
      return itm.dead === true;
    });

    var names = dead.map(image => {
      return image.name;
    });
    return names;
  }

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = name => {
    this.setState({ submitted: true });
    const api = "https://got-draft-jcallin.structure.sh/api/putData";
    console.log(
      `Posting submitter ${name} and data ${this.state.dead} to ${api}`
    );
    if (process.env.NODE_ENV !== "development") {
      axios.post(api, {
        name: name,
        dead: this.state.dead
      });
      this.setState({ submitted: true });
    }
  };

  render() {
    var customOverlay = (
      <img className="death-overlay" alt="placeholder" src={deathOverlay} />
    );

    var images = this.state.images.map(i => {
      i.customOverlay = customOverlay;
      return i;
    });

    if (this.state.submitted) {
      return (
        <>
          <div className="submitted">Thanks for playing!</div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.setState({ submitted: false })}
          >
            Pick again
          </button>
        </>
      );
    } else {
      return (
        <>
          <div className="main-header">The Game of Thrones Death Draft</div>
          <div className="main-page">
            <div className="image-grid">
              <Gallery
                images={images}
                enableLightbox={false}
                onSelectImage={this.onSelectImage}
                onClickThumbnail={this.onSelectImage}
                tileViewportStyle={this.tileViewportStyle}
                thumbnailStyle={this.thumbnailStyle}
              />
            </div>

            <div>
              <form className="name-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    onChange={e => this.setState({ name: e.target.value })}
                    id="input-name"
                    placeholder="Enter your name"
                  />
                  <small id="emailHelp" className="form-text text-muted" />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.putDataToDB(this.state.name)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      );
    }
  }
}

MainPage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      srcset: PropTypes.array,
      caption: PropTypes.string,
      thumbnailWidth: PropTypes.number.isRequired,
      thumbnailHeight: PropTypes.number.isRequired,
      isSelected: PropTypes.bool
    })
  ).isRequired
};

MainPage.defaultProps = data;

export default MainPage;
