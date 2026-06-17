const SkeletonCard = () => (
  <article className='card'>
    <div className='card__poster skeleton' />
    <div className='card__body'>
      <div className='skeleton skeleton-line' />
      <div className='card__footer'>
        <div className='skeleton skeleton-line skeleton-line--short' />
      </div>
    </div>
  </article>
)

export default SkeletonCard
