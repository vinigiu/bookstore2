import styled from 'styled-components';

type TSearchTypeButton = {
    selected: boolean
}

export const Title = styled.div`
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

export const SearchTypeButton = styled.button<TSearchTypeButton>`
    padding: 7px;
    border-radius: 5px;
    color: ${props => props.selected ? '#d0c8f1' :'#080124'};
    background-color: ${props => props.selected ? '#6146ce' :'#9480e7'};
`;