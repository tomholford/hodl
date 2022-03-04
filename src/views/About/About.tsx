import { ExternalLink } from "../Shared/ExternalLink"
import './About.scss';

export const About = () => {
  return (
    <div className="about-container">

      <h2>About</h2>
      <p>
        %hodl is a crypto portfolio tracker powered by the &nbsp;
        <ExternalLink href="https://www.coingecko.com/en/api" >CoinGecko API</ExternalLink>.
      </p>
      <p>
        Add some assets and get a real time summary of your crypto net worth.
      </p>

      <h2>How it works</h2>
      <p>
        Currently the asset data is persisted using the browser's &nbsp;
        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">localStorage</ExternalLink>.
      </p>
      <p>
        For now, this means that data is not synced between different devices.
      </p>

      <h2>Roadmap</h2>
      <ul>
        <li>Backend persistence</li>
        <li>Connect a wallet to autoload account information</li>
        <li>Charts</li>
      </ul>

      <h2>Questions or Feedback</h2>
      <p>
        DM me at <code>~datder-sonnet</code> or join <code>~dister-datder-sonnet/hodl</code>
      </p>
    </div>
  )
}
