import React from 'react';
import { ExternalLink } from "../Shared/ExternalLink"
import './About.scss';

import mauveWingUrl from '@/images/mauve-wing.png';
import stellerfallUrl from '@/images/stellarfall.png';
import { versionLabel } from '../../flags';

export const About = () => {
  return (
    <div className="about-container">
      <h2>About</h2>
      <p>
        <code>%hodl</code> is a simple crypto portfolio powered by the &nbsp;
        <ExternalLink href="https://www.coingecko.com/en/api" >CoinGecko API</ExternalLink>.
      </p>
      <p>
        Add some assets and get a real time summary of your crypto net worth.
      </p>
      <p>All data you enter is stored on your Urbit ship.</p>
      <p>
        Source code available &nbsp;
        <ExternalLink href="https://www.github.com/tomholford/hodl" >here</ExternalLink>.
      </p>
      <h2>Questions or Feedback</h2>
      <p>
        DM <code>~datder-sonnet</code> or join <ExternalLink href="web+urbitgraph://group/~hodler-datder-sonnet/hodl"><code>~hodler-datder-sonnet/hodl</code></ExternalLink>
      </p>
      <h2>Art</h2>
      <p>The art used in <code>%hodl</code> and its promotional material was commissioned from  members in the Urbit community. Special thanks to these talented artists!</p>
      <h3>~tocrex-holpen</h3>
      <img src={mauveWingUrl} alt="" />
      <h3>~mallus-fabres</h3>
      <img src={stellerfallUrl} alt="" />
      <h2>Special Thanks</h2>
      <ul>
        <li>~tanned-sipped for design, feedback, testing, and product ideation</li>
        <li>~tocrex-holpen and ~mallus-fabres for artistic aesthetic</li>
        <li>~sarpen-laplux, ~hastuc-dibtux, and ~nocsyx-lassul for hoon expertise</li>
      </ul>
      <h2>Version</h2>
      <p><code>{versionLabel}</code></p>
    </div>
  )
}
