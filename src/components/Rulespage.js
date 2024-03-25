import React, { useEffect } from 'react';

const RulesPage = () => {
  useEffect(() => {
    // Enable Bootstrap collapse functionality
    const accordions = document.querySelectorAll('.accordion-button');
    accordions.forEach((accordion) => {
      accordion.addEventListener('click', () => {
        const target = accordion.getAttribute('data-bs-target');
        const collapse = document.querySelector(target);
        collapse.classList.toggle('show');
      });
    });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-5">Rules and Regulations</h1>

      <div className="accordion accordion-flush mt-5" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseDo" aria-expanded="false" aria-controls="flush-collapseDo">
              Do's
            </button>
          </h2>
          <div id="flush-collapseDo" className="accordion-collapse collapse" aria-labelledby="flush-headingDo" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
              <ul>
                <li>Respectful Conduct: Maintain a respectful demeanor towards fellow participants, regardless of differing opinions.</li>
                <li>Active Listening: Listen attentively to others' arguments without interrupting. Respond thoughtfully to points raised.</li>
                <li>Constructive Criticism: Offer constructive criticism and feedback rather than resorting to personal attacks.</li>
                <li>Cite Sources: Support your arguments with credible sources and evidence to enhance the validity of your points.</li>
                <li>Stay on Topic: Keep the discussion focused on the assigned topic or motion to ensure relevance and coherence.</li>
                <li>Engage with Counterarguments: Acknowledge and engage with counterarguments, fostering a robust exchange of ideas.</li>
                <li>Adhere to Time Limits: Respect time limits for speaking to allow equitable participation among all debaters.</li>
                <li>Open-mindedness: Approach the debate with an open mind, being willing to consider alternative viewpoints.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseDont" aria-expanded="false" aria-controls="flush-collapseDont">
              Dont's
            </button>
          </h2>
          <div id="flush-collapseDont" className="accordion-collapse collapse" aria-labelledby="flush-headingDont" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
              <ul>
                <li>Personal Attacks: Avoid resorting to personal attacks, insults, or derogatory language towards other participants.</li>
                <li>Interrupting: Refrain from interrupting or speaking over others while they are presenting their arguments.</li>
                <li>Misrepresentation: Do not misrepresent or distort the arguments of others to discredit their positions.</li>
                <li>Monopolizing Time: Avoid monopolizing speaking time; allow others the opportunity to express their views.</li>
                <li>Ignoring Rules: Disregard any rules or guidelines set forth for the debate, compromising the integrity of the discussion.</li>
                <li>Ignoring Counterarguments: Ignore or dismiss counterarguments without addressing their validity or relevance.</li>
                <li>Lack of Preparation: Fail to adequately prepare for the debate, leading to weak or unsupported arguments.</li>
                <li>Disruptive Behavior: Engage in disruptive behavior that undermines the orderly conduct of the debate.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RulesPage;
