import React from "react";
import { Link } from "react-router-dom";

const Episode8Summary = () => {
  return (
    <>
      <div className="main-header">Season 8 Episode 5 Results</div>
      <Link className="summary-announcement sub-header" to="/">
        &gt; Choose for the finale &lt;
      </Link>
      <div className="summary-announcement sub-header">
        Here are the results from last week's guesses. We had 59 participants
        and the top 5 choices were all characters who met their end! Sorry for
        not including the valiant Harry Strickland of the Golden Company--
        everyone gets him as a freebie. Updated guess homepage is coming soon.
      </div>
      <iframe
        className="plotly-embed histogram"
        title="histogram"
        frameborder="0"
        scrolling="no"
        src="//plot.ly/~jcallin/4.embed"
      />
      <iframe
        className="plotly-embed summary-table"
        title="winner-table"
        frameborder="0"
        scrolling="no"
        src="//plot.ly/~jcallin/7.embed"
      />
    </>
  );
};

export default Episode8Summary;
