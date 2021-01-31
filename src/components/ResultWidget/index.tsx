import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '../Button';
import Widget from '../Widget';

interface Props {
  results: Array<boolean>;
  // eslint-disable-next-line react/require-default-props
}

export default function ResultWidget({ results }: Props) {
  const { query } = useRouter();

  const correctAlternatives = results.filter((result) => result).length;
  const totalPoints = correctAlternatives * 100;

  return (
    <Widget>
      <Widget.Header>Tela de Resultado:</Widget.Header>

      <Widget.Content>
        {totalPoints === 0 ? (
          <>
            <p>Estude mais, {query.name}!</p>
            <h1>Você fez 0 pontos, que pena :(</h1>
          </>
        ) : (
          <>
            <p>Mandou bem, {query.name}!</p>
            <h1>Você fez {totalPoints} pontos, Parabéns :)</h1>
          </>
        )}
        <ul>
          {results.map((result, index) => {
            const resultId = `result__${index}`;
            const resultPosition = index + 1;
            const resultPositionHasTwoSquares = resultPosition < 10 && '0';

            return (
              <li key={resultId}>
                #{resultPositionHasTwoSquares}
                {resultPosition} Resultado:{' '}
                {result ? 'Acertou Viseravel!' : 'Errou!'}
              </li>
            );
          })}
        </ul>
        <Button>
          <Link href="/">Voltar para a home</Link>
        </Button>
      </Widget.Content>
    </Widget>
  );
}
