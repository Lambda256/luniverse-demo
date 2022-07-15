import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.components.container("column", "center", "center")}
`;

export const ErrorCode = styled.h1`
  color: ${({theme}) => theme.color.error};
  font-size: 2rem;
  font-weight: ${({theme}) => theme.fontWeight.bold};
`;

export const ErrorMsg = styled.p`
  color: ${({theme}) => theme.color.error};
  font-size: 1.5rem;
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
`;

export const Btn = styled.button`
  border: none;
  background: ${({theme}) => theme.color.bg};
  font-size: 1rem;
  padding: .5rem;
  border-radius: .25rem;


  &:hover{
    cursor: pointer;
  }
`;