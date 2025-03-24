const BreadcrumbHero = ({ title, description }) => {
  return (
    <section 
      className="relative bg-cover bg-center h-[300px] flex items-center justify-center" 
      style={{ backgroundImage: "url('/img/normal-breadcrumb.jpg')" }}
    >
      <div className="text-center text-white">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <p style={{ marginTop: '20px', fontSize: '30px' }}>{description}</p>
      </div>
    </section>
  )
}

export default BreadcrumbHero
