import styled from 'styled-components';

export const Title = styled.div`
    font-size: 4rem;
    color: #594a92;
    font-weight: 500;
`;

export const SearchButton = styled.button`
    color: #594a92;
    &:hover {
        color: #463297;
        font-weight: 600;
    }
`;

export const Input = styled.input`
    &:focus {
        border-color: #594a92;
    }
`;