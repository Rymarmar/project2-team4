import {useState} from "react";
import {LoadingSpinner} from "../components/LoadingSpinner.tsx";
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import {TransactionList} from "../components/TransactionList.tsx";
import {useTransactions} from "../hooks/useTransactions.ts";

const PAGE_SIZE = 10;

export function TransactionHistoryPage() {
    const [page, setPage] = useState<number>(1);

    const {
        transactions,
        loading: transactionsLoading,
        error: transactionsError,
    } = useTransactions(100);

    const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageTransactions = transactions.slice(startIndex, startIndex + PAGE_SIZE);

    const goPrevious = () => setPage(Math.max(1, currentPage - 1));
    const goNext = () => setPage(Math.min(totalPages, currentPage + 1));

    return (
        <Container className="py-4">
            <div className="content-panel">
            {/*<h1 className="mb-4 text-dark">Transaction History</h1>*/}
            <Row className="g-3">
                <Col xs={12}>
                    {transactionsLoading ? (
                        <LoadingSpinner label="Loading transactions..." />
                    ) : transactionsError ? (
                        <Alert variant="danger" className="mt-4">
                            {transactionsError}
                        </Alert>
                    ) : (
                        <TransactionList transactions={pageTransactions} title={"All Transactions"} showAccountIds={true} colorByType={true}/>
                    )}
                </Col>
            </Row>

            {!transactionsLoading && !transactionsError && transactions.length > 0 && (
                <Row className="g-3 mt-2">
                    <Col className="d-flex justify-content-between align-items-center">
                        <Button
                            variant="outline-primary"
                            onClick={goPrevious}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>

                        <span>
                            Page {currentPage} of {totalPages}
                        </span>

                        <Button
                            variant="outline-primary"
                            onClick={goNext}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </Col>
                </Row>
            )}
            </div>
        </Container>
    );
}
