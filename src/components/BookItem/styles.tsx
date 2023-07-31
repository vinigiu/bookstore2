import styled from 'styled-components';

export const AuthorTitle = styled.div`
    color: #463297;
    font-size: 1.1rem;
    font-weight: 500;
`;

export const BookAuthor = styled.li`
    color: #463297;
    font-size: 1.1rem;
    font-weight: 500;
`;

export const BookCard = styled.div`
    padding: 1rem;
    background-color: #d5cbff;
    border-radius: 10px;

    &:hover {
        background-color: #9b84f8;
        div, li {
            color: #fafafa;
        }
    }
`;

export const BookImageContainer = styled.div`
    min-width: 120px;
`;

export const BookTitle = styled.div`
    color: #463297;
    font-size: 1.4rem;
    font-weight: 700;
`;
