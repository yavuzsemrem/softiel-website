export default function SimplePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple Test Page</h1>
      <p>Server is working!</p>
      <p>Time: {new Date().toLocaleString()}</p>
    </div>
  )
}
