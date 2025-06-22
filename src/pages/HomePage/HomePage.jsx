import { Container } from "../../components/Container/Container"
import { CsvInfo } from "../../components/CsvInfo/CsvInfo"
import { DownloadFile } from "../../components/DownloadFile/DownloadFile"
import { SendCsv } from "../../components/SendCsv/SendCsv"
import styles from './HomePage.module.css'

export const HomePage = function(){
    return(
        <Container>
            <div className={styles.home}>
                <div className={styles.paragraph}>Загрузите <b>csv </b>файл и получите <b>полную информацию </b>о нём за сверхнизкое время</div>
                <DownloadFile/>
                <SendCsv/>
                <CsvInfo/>
            </div>
        </Container>
    )
} 