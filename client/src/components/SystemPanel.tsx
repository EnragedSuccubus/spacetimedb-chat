import { type JSX } from 'react';

type Props = {
    message: string;
};

export default function SystemPanel({ message }: Props): JSX.Element {
    return (
        <div>
            <p>{message}</p>
        </div>
    );
}