const occasions = [
  'Birthdays',
  'Family gatherings',
  'Friendships',
  'Special holidays',
]

export function Celebrate() {
  return (
    <section className="section celebrate" aria-labelledby="celebrate-title">
      <div className="section-inner narrow">
        <p className="eyebrow">Every occasion</p>
        <h2 id="celebrate-title">Celebrate with joyful memories</h2>
        <p className="section-sub">
          Celebrate birthdays, family gatherings, friendships, and special
          holidays with unforgettable moments and joyful memories.
        </p>
        <ul className="occasion-list">
          {occasions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
