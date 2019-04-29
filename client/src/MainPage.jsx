import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import Gallery from "react-grid-gallery";

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

  // thumbnailStyle() {
  //   return {
  //     // width: "100px"
  //     objectFit: "contain"
  //   };
  // }

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

    var filtered = dead.map(image => {
      return image.name;
    });
    return filtered;
  }

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = name => {
    this.setState({ submitted: true });
    console.log(`Posting ${name} and data ${this.state.dead}`);
    axios.post("http://localhost:80/api/putData", {
      name: name,
      dead: this.state.dead
    });
  };

  render() {
    if (this.state.submitted) {
      return <div className="submitted">Thanks for playing!</div>;
    } else {
      return (
        <div className="image-grid">
          <div className="main-header">Game of Thrones Death Draft</div>
          <Gallery
            images={this.state.images}
            enableLightbox={false}
            onSelectImage={this.onSelectImage}
            onClickThumbnail={this.onSelectImage}
            tileViewportStyle={this.tileViewportStyle}
            thumbnailStyle={this.thumbnailStyle}
          />
          <form className="name-form">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                onChange={e => this.setState({ name: e.target.value })}
                id="input-name"
                placeholder="Enter name"
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

MainPage.defaultProps = {
  images: [
    {
      name: "Tyrion",
      dead: false,
      src: "http://assets.viewers-guide.hbo.com/small59944e8fe5822@2x.jpg",
      thumbnail:
        "http://assets.viewers-guide.hbo.com/small59944e8fe5822@2x.jpg",
      thumbnailWidth: 640,
      thumbnailHeight: 640
    },
    {
      name: "Jamie",
      dead: false,
      src:
        "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Jaime_Lannister-Nikolaj_Coster-Waldau.jpg/220px-Jaime_Lannister-Nikolaj_Coster-Waldau.jpg",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Jaime_Lannister-Nikolaj_Coster-Waldau.jpg/220px-Jaime_Lannister-Nikolaj_Coster-Waldau.jpg",
      thumbnailWidth: 220,
      thumbnailHeight: 327
    },
    {
      name: "Dany",
      dead: false,
      src:
        "https://www.telegraph.co.uk/content/dam/fashion/2017/06/19/TELEMMGLPICT000131421802_trans_NvBQzQNjv4BqkUE_BTgBOQu3VWKvpDGX9fr7sARQy7EgBjwPUzvqL_M.jpeg?imwidth=450",
      thumbnail:
        "https://www.telegraph.co.uk/content/dam/fashion/2017/06/19/TELEMMGLPICT000131421802_trans_NvBQzQNjv4BqkUE_BTgBOQu3VWKvpDGX9fr7sARQy7EgBjwPUzvqL_M.jpeg?imwidth=450",
      thumbnailWidth: 480,
      thumbnailHeight: 300
    },
    {
      name: "Jon",
      dead: false,
      src:
        "https://vignette.wikia.nocookie.net/gameofthrones/images/d/d3/JonSnowSeason8HB.jpg/revision/latest/scale-to-width-down/333?cb=20190401173347",
      thumbnail:
        "https://vignette.wikia.nocookie.net/gameofthrones/images/d/d3/JonSnowSeason8HB.jpg/revision/latest/scale-to-width-down/333?cb=20190401173347",
      thumbnailWidth: 333,
      thumbnailHeight: 500
    },
    {
      name: "Sansa",
      dead: false,
      src:
        "https://media.fromthegrapevine.com/assets/images/2018/8/sansa-stark.jpg.480x0_q71_crop-scale.jpg",
      thumbnail:
        "https://media.fromthegrapevine.com/assets/images/2018/8/sansa-stark.jpg.480x0_q71_crop-scale.jpg",
      thumbnailWidth: 480,
      thumbnailHeight: 327
    },
    {
      name: "Arya",
      dead: false,
      src:
        "https://i0.wp.com/metro.co.uk/wp-content/uploads/2019/04/SEI_59793697-e1555334390108.jpg?quality=90&strip=all&zoom=1&resize=540%2C338&ssl=1",
      thumbnail:
        "https://i0.wp.com/metro.co.uk/wp-content/uploads/2019/04/SEI_59793697-e1555334390108.jpg?quality=90&strip=all&zoom=1&resize=540%2C338&ssl=1",
      thumbnailWidth: 540,
      thumbnailHeight: 338
    },
    {
      name: "Sir Davos",
      dead: false,
      src:
        "https://media.fromthegrapevine.com/assets/images/2018/8/davos-thonres.jpg.480x0_q71_crop-scale.jpg",
      thumbnail:
        "https://media.fromthegrapevine.com/assets/images/2018/8/davos-thonres.jpg.480x0_q71_crop-scale.jpg",
      thumbnailWidth: 480,
      thumbnailHeight: 323
    },
    {
      name: "Missandei",
      dead: false,
      src:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.hellogiggles.com%2Fuploads%2F2016%2F06%2F20073629%2Fmissandei.jpg&w=450&c=sc&poi=face&q=85",
      thumbnail:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.hellogiggles.com%2Fuploads%2F2016%2F06%2F20073629%2Fmissandei.jpg&w=450&c=sc&poi=face&q=85",
      thumbnailWidth: 450,
      thumbnailHeight: 281
    },
    {
      name: "Theon",
      dead: false,
      src:
        "https://images.8tracks.com/cover/i/010/135/517/got-game-of-thrones-30780609-496-500-5586.png?rect=0,2,496,496&q=98&fm=jpg&fit=max",
      thumbnail:
        "https://images.8tracks.com/cover/i/010/135/517/got-game-of-thrones-30780609-496-500-5586.png?rect=0,2,496,496&q=98&fm=jpg&fit=max",
      thumbnailWidth: 496,
      thumbnailHeight: 496
    },
    {
      name: "Samwell",
      dead: false,
      src:
        "https://media.fromthegrapevine.com/assets/images/2018/8/sam-tarly.jpg.480x0_q71_crop-scale.jpg",
      thumbnail:
        "https://media.fromthegrapevine.com/assets/images/2018/8/sam-tarly.jpg.480x0_q71_crop-scale.jpg",
      thumbnailWidth: 480,
      thumbnailHeight: 327
    },
    {
      name: "Bran",
      dead: false,
      src:
        "https://www.thewrap.com/wp-content/uploads/2019/04/game-of-thrones-check-out-all-these-bran-stark-memes.jpg",
      thumbnail:
        "https://www.thewrap.com/wp-content/uploads/2019/04/game-of-thrones-check-out-all-these-bran-stark-memes.jpg",
      thumbnailWidth: 618,
      thumbnailHeight: 412
    },
    {
      name: "Brienne",
      dead: false,
      src:
        "https://aa1a5178aef33568e9c4-a77ea51e8d8892c1eb8348eb6b3663f6.ssl.cf5.rackcdn.com/p/full/5214cd2b-3557-4653-9840-e75bab41ba46.jpg",
      thumbnail:
        "https://aa1a5178aef33568e9c4-a77ea51e8d8892c1eb8348eb6b3663f6.ssl.cf5.rackcdn.com/p/full/5214cd2b-3557-4653-9840-e75bab41ba46.jpg",
      thumbnailWidth: 720,
      thumbnailHeight: 540
    },
    {
      name: "Varys",
      dead: false,
      src:
        "https://pixel.nymag.com/imgs/daily/vulture/2017/07/31/31-got-varys.w700.h700.jpg",
      thumbnail:
        "https://pixel.nymag.com/imgs/daily/vulture/2017/07/31/31-got-varys.w700.h700.jpg",
      thumbnailWidth: 700,
      thumbnailHeight: 700
    },
    {
      name: "Sandor",
      dead: false,
      src:
        "https://i.kinja-img.com/gawker-media/image/upload/s--P5IOcr4w--/c_scale,f_auto,fl_progressive,q_80,w_800/juaornxbgbeuitbgxuwg.jpg",
      thumbnail:
        "https://i.kinja-img.com/gawker-media/image/upload/s--P5IOcr4w--/c_scale,f_auto,fl_progressive,q_80,w_800/juaornxbgbeuitbgxuwg.jpg",
      thumbnailWidth: 800,
      thumbnailHeight: 450
    },
    {
      name: "Bronn",
      dead: false,
      src:
        "https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2017%2F03%2FBronn.jpg&c=sc&w=736&h=485",
      thumbnail:
        "https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2017%2F03%2FBronn.jpg&c=sc&w=736&h=485",
      thumbnailWidth: 734,
      thumbnailHeight: 485
    },
    {
      name: "Tormund",
      dead: false,
      src:
        "https://cdn1.thr.com/sites/default/files/imagecache/scale_crop_768_433/2019/04/tormund-1_copy.jpg",
      thumbnail:
        "https://cdn1.thr.com/sites/default/files/imagecache/scale_crop_768_433/2019/04/tormund-1_copy.jpg",
      thumbnailWidth: 768,
      thumbnailHeight: 463
    },
    {
      name: "Gendry",
      dead: false,
      src:
        "https://imgix.bustle.com/uploads/image/2017/10/2/68b6a374-2895-4d2d-81b0-c8d35b1437d6-2513f4b2-ba66-45dc-bf79-3f6cf0fa539f-gendry-1366x768-1.jpg?w=970&h=546&fit=crop&crop=faces&auto=format&q=70",
      thumbnail:
        "https://imgix.bustle.com/uploads/image/2017/10/2/68b6a374-2895-4d2d-81b0-c8d35b1437d6-2513f4b2-ba66-45dc-bf79-3f6cf0fa539f-gendry-1366x768-1.jpg?w=970&h=546&fit=crop&crop=faces&auto=format&q=70",
      thumbnailWidth: 970,
      thumbnailHeight: 546
    },
    {
      name: "Grey Worm",
      dead: false,
      src:
        "https://vignette.wikia.nocookie.net/gameofthrones/images/b/b7/Grey_Warm.png/revision/latest?cb=20130429062009",
      thumbnail:
        "https://vignette.wikia.nocookie.net/gameofthrones/images/b/b7/Grey_Warm.png/revision/latest?cb=20130429062009",
      thumbnailWidth: 512,
      thumbnailHeight: 287
    },
    {
      name: "Jorah",
      dead: false,
      src:
        "https://assets3.thrillist.com/v1/image/2693586/size/tmg-article_default_mobile.jpg",
      thumbnail:
        "https://assets3.thrillist.com/v1/image/2693586/size/tmg-article_default_mobile.jpg",
      thumbnailWidth: 480,
      thumbnailHeight: 325
    },
    {
      name: "Gilly",
      dead: false,
      src:
        "http://www.wheninmanila.com/wp-content/uploads/2017/09/Gilly-Game-of-Thrones-Hannah-Murray.jpg",
      thumbnail:
        "http://www.wheninmanila.com/wp-content/uploads/2017/09/Gilly-Game-of-Thrones-Hannah-Murray.jpg",
      thumbnailWidth: 680,
      thumbnailHeight: 360
    }
  ]
};

export default MainPage;
