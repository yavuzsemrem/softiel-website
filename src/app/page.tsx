import { redirect } from 'next/navigation'

export default function Home() {
  // Varsayılan olarak Türkçe'ye yönlendir
  redirect('/tr')
}
