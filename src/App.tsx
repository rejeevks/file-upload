import { Button, Flex, Grid, Heading, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import Transactions from "./ Transactions";
import "./App.css";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

function App() {
  const [bank, setBank] = useState("");
  const [selectedFile, setSelectedFile] = useState<any | Blob>(null);
  const [userData, setUserData] = useState<any | null>();

  const toast = useToast();

  const handleFileInput = (e: any) => {
    // handle validations
    setSelectedFile(e.target.files[0]);
  };

  const submitForm = () => {
    const formData = new FormData();
    formData.append("BANKNAMES", bank);
    formData.append("excelfile", selectedFile);

    console.log(formData.getAll("file"));
    console.log(formData.getAll("bankname"));

    axios
      .post("http://3ce1-115-246-244-26.ngrok.io/exceltojson/excell", formData)
      .then((res: any) => {
        if (res.data.status == true) {
          setUserData(res.data.resdata);
          toast({
            title: "Data Uploaded",
            description: "File converted",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error",
            description: "Please check the file",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
        console.log(res);
      });
  };
  return (
    <div>
      <Heading>File Upload</Heading>
      <div>
        <Flex mt={20}>
          <Grid pr={20}>
            <Select
              placeholder="Select Bank"
              onChange={(e) => setBank(e.target.value)}
              w={40}
              ml={50}
            >
              <option value="HDFC">HDFC</option>
              <option value="ICICI">ICICI</option>
            </Select>
          </Grid>

          <form>
            <input
              type="file"
              // accept=".xls,.ods,.xlsx"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleFileInput}
            />
            <Button onClick={submitForm} colorScheme="blue">
              Upload
            </Button>
          </form>
        </Flex>

        <Grid mt={20}>
          <Transactions bankData={userData} />
        </Grid>
      </div>
    </div>
  );
}

export default App;
