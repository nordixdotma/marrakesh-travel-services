export default function EmptySectionB() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-lg p-12 text-center"
          style={{
            background: "linear-gradient(180deg, var(--color-gradient-start) 0%, var(--color-gradient-end) 100%)",
          }}
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
            Special Offers Section
          </h2>
          <p className="text-lg opacity-70">Add your content here</p>
        </div>
      </div>
    </section>
  )
}
