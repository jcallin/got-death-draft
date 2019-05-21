import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Gallery from "./Gallery";
import data from "./resources/data";
import deathOverlay from "./resources/death-overlay.png";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imagesDead: this.props.images,
      dead: this.filterDead(this.props.images),
      throne: "No One",
      submitted: false
    };

    this.onSelectImageDead = this.onSelectImageDead.bind(this);
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

  onSelectImageDead(index, image) {
    var images = this.state.imagesDead.slice();
    var img = images[index];
    if (img.hasOwnProperty("isSelected")) img.isSelected = !img.isSelected;
    else img.isSelected = true;

    img.dead = img.isSelected;

    this.setState({
      imagesDead: images,
      dead: this.filterDead(images)
    });
  }

  filterDead(images) {
    var dead = images
      .filter(itm => {
        return itm.dead === true;
      })
      .map(image => {
        return image.name;
      });
    return dead;
  }

  putDataToDB = () => {
    this.setState({ submitted: true });
    const api = "https://gotdeathdraft.tk/api/putData";
    if (process.env.NODE_ENV !== "development") {
      axios.post(api, {
        name: this.state.name,
        dead: this.state.dead,
        throne: this.state.throne,
        submissionTime: new Date(new Date().toUTCString())
      });
      this.setState({ submitted: true });
    }
  };

  renderNameChoices = names => {
    return names.map(name => {
      return <option key={name.name}>{name.name}</option>;
    });
  };

  render() {
    var customOverlayDead = (
      <img className="thumbnail-overlay" alt="placeholder" src={deathOverlay} />
    );

    var imagesDead = this.state.imagesDead.map(i => {
      i.customOverlay = customOverlayDead;
      return i;
    });

    if (this.state.submitted) {
      return (
        <div className="submitted">
          <div>Thanks for picking!</div>
          <p
            className="sub-header"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            We take your last pick before this week's episode airs
          </p>
          <p className="sub-header">
            Feel free to pick again, just use the same name
          </p>
          <button
            type="button"
            className="btn btn-primary pick-again-btn"
            onClick={() => this.setState({ submitted: false })}
          >
            Pick again
          </button>
        </div>
      );
    } else {
      return (
        <>
          <div className="main-header">The Game of Thrones Death Draft</div>
          <p className="sub-header">
            Pick who dies in the show's finale! Pick who sits the Iron Throne at
            the bottom. Best guesses and stats posted after the finale.
          </p>
          <p className="sub-header">
            Congrats to Cewy and Hans who had all 7 deaths correct last week
            with 0 incorrect guesses!
          </p>
          <Link className="sub-header" to="/s8e5-summary">
            See Season 8 Episode 5 Results
          </Link>
          <div className="main-page">
            <div className="grid-gallery-container">
              <Gallery
                images={imagesDead}
                enableLightbox={false}
                onSelectImage={this.onSelectImage}
                onClickThumbnail={this.onSelectImageDead}
                tileViewportStyle={this.tileViewportStyle}
                thumbnailStyle={this.thumbnailStyle}
              />
            </div>
            <div className="who-will sub-header">
              Who will sit the Iron Throne?
            </div>
            <div>
              <form className="name-form">
                <div className="form-group">
                  <select
                    default="No One"
                    id="inputState"
                    className="form-control"
                    onChange={e => this.setState({ throne: e.target.value })}
                  >
                    <option key="No One">No One</option>
                    {this.renderNameChoices(this.state.imagesDead)}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    onChange={e => this.setState({ name: e.target.value })}
                    id="input-name"
                    placeholder="Enter your name"
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted" />
                  <button
                    type="button"
                    className="btn btn-primary submit-btn"
                    onClick={() => this.putDataToDB()}
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
