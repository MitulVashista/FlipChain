import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function About() {
    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                About
            </Typography>
            <Paper elevation={3} sx={{ p: 2, backgroundColor: '#f0f0f0' }}>
                <Typography variant="h5" gutterBottom color="primary">
                    Tokenomics of FlipChain Platform
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Token Name:</strong> FlipCoin (FP)
                </Typography>
                <Typography variant="h6" gutterBottom color="primary">
                    Distribution and Allocation:
                </Typography>
                <ol>
                    <li>
                        <Typography>
                            Initial Purchase Reward: Customers will receive 100 FlipCoins on their first purchase from the FlipChain app.
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            Purchase-Based Rewards: Customers will receive FlipCoins equal to 5% of the amount of the product on each purchase from the FlipChain app.
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            Cumulative Milestone Rewards (Partner Brand Loyalty): Customers will receive additional FlipCoins based on the cumulative purchase amount from partner brands as follows:
                            <br></br> For Example:
                            <ul>
                                <li>Up to Rs. 10,000 cumulative purchase: 1% of product amount.</li>
                                <li>Rs. 10,001 - Rs. 30,000 cumulative purchase: 2% of product amount.</li>
                                <li>Rs. 30,001 - Rs. 80,000 cumulative purchase: 3% of product amount.</li>
                            </ul>
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            Referral Rewards: Referrers will receive 100 FlipCoins when a new customer registers on the app using their referral code and makes their first purchase.
                        </Typography>
                    </li>
                </ol>
                <Typography variant="h6" gutterBottom color="primary">
                    Token Redemption:
                </Typography>
                <ol>
                    <li>
                        <Typography>
                            Customers can redeem FlipCoins for rewards or make partial payments (up to 50%) for item purchases within the FlipChain app.
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            Redeemed FlipCoins will be transferred to the brand offering the rewards or the item. For partial payments, the remaining payment can be made through other means.
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            Partner brands can issue rewards like discount vouchers that customers can obtain by redeeming FlipCoins.
                        </Typography>
                    </li>
                </ol>
                <Typography variant="h6" gutterBottom color="primary">
                    Token Purchase by Brands:
                </Typography>
                <ol>
                    <li>
                        <Typography>
                            Brands can buy FlipCoins from Flipkart at a rate of Rs. 0.1 per FlipCoin. This allows brands to acquire FlipCoins for rewarding loyal customers or for customer acquisition.
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            The brands can then distribute these FlipCoins to their customers as part of their loyalty programs or marketing campaigns.
                        </Typography>
                    </li>
                </ol>
                <Typography variant="h6" gutterBottom color="primary">
                    Token Utility:
                </Typography>
                <ol>
                    <li>
                        <Typography>
                            FlipCoins can be used to incentivize customer loyalty and engagement within the FlipChain app.
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            Customers can use FlipCoins to access rewards, discounts, and partial payments for products.
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            Brands can utilize FlipCoins to attract and retain customers, as well as to promote their products.
                        </Typography>
                    </li>
                </ol>
            </Paper>
        </Box>
    );
}

