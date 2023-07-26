import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./wallet.css"
import { Card, CardContent } from '@mui/material';



const TransactionDetails = styled(Box)({
    border: "1px solid red",

    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

const TransactionItem = styled(Box)({

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const TransactionDate = styled(Typography)({
    fontSize: 14,
});

const TransactionAmount = styled(Typography)({
    fontSize: 14,
});

const TransactionStatus = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    color:
        theme.palette.mode === 'light'
            ? theme.palette.grey[600]
            : theme.palette.grey[400],
}));
const WalletBalance = styled(Typography)({
    fontSize: 24,
    fontWeight: 'bold',
});

const StyledCard = styled(Card)({
    width: '80%',
    margin: 'auto',
    transition: 'all .2s ease-in-out',

    '&:hover': {
        transform: 'scale(1.05)',
        cursor: 'pointer',
    },
});

const StyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const StyledButton = styled(Button)({
    width: '15%',

    marginTop: '.5rem',
});







const Wallet = () => {

    return (
        <>
            <Box sx={{ p: 2 }}>
                <StyledCard className="card">
                    <StyledCardContent sx={{ width: '100%' }}>
                        <Typography variant="h6" gutterBottom className="card__title">
                            Total Points
                        </Typography>
                        <StyledCardContent sx={{ width: '100%' }}>
                            <WalletBalance className="card__balance">1,550</WalletBalance>
                            <StyledButton variant="contained" color="primary" className="card__button">
                                Move to wallet
                            </StyledButton>
                        </StyledCardContent>
                    </StyledCardContent>

                    <StyledCardContent sx={{ width: '100%' }}>
                        <WalletBalance className="card__balance">$1,550.56</WalletBalance>

                        <Typography variant="h6" gutterBottom className="card__title">
                            Wallet
                        </Typography>
                        <StyledButton variant="contained" color="primary" className="card__button">
                            Withdraw
                        </StyledButton>
                        <StyledButton variant="contained" color="primary" className="card__button">
                            Add Money
                        </StyledButton>
                    </StyledCardContent>
                </StyledCard>

                <Box sx={{ mt: 2 }}>
                    <TransactionDetails>
                        <TransactionItem>
                            <TransactionDate>Jul 25, 2023</TransactionDate>
                            <TransactionAmount>$100.00</TransactionAmount>
                            <TransactionStatus>Successful</TransactionStatus>
                        </TransactionItem>
                        <TransactionItem>
                            <TransactionDate>Jul 24, 2023</TransactionDate>
                            <TransactionAmount>$50.00</TransactionAmount>
                            <TransactionStatus>Declined</TransactionStatus>
                        </TransactionItem>
                        <TransactionItem>
                            <TransactionDate>Jul 23, 2023</TransactionDate>
                            <TransactionAmount>$200.00</TransactionAmount>
                            <TransactionStatus>Successful</TransactionStatus>
                        </TransactionItem>
                    </TransactionDetails>
                </Box>
            </Box>
        </>
    )
}

export default Wallet