// Small generated thumbnail: a hue gradient with a building silhouette.
export default function Art({ kind, hue }) {
  return (
    <div className="art" style={{ '--h': hue }} aria-hidden="true">
      <i className={kind} />
    </div>
  );
}
