import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

function Navbar() {
    const router = useRouter();
  return (
    <Menu inverted attached style={{padding: '1.5rem'}}>
        <Container>
            <Menu.Item onClick={() => router.push('/')}>
                <Image src='https://react.semantic-ui.com/logo.png' alt='Logotipo' width={30} height={30}/>
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>
                    <Button onClick={() => router.push('/task/new')}>
                        new task
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
  )
}

export default Navbar