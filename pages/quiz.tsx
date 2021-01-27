import { useRouter } from 'next/router';

export default function Quiz() {
  const { query } = useRouter();

  return (
    <h1>{ query.name }</h1>
  )
}