import React from 'react';
import { Link } from 'react-router';
import { Card, CardTitle } from 'material-ui/Card';


const HomePage = () => (
  <Card className="container">
    <CardTitle title="" subtitle="" />
    	<div className="element">
				Hello! <Link to={'/login'}>log in</Link> to see your dashboard.
		</div>

	
  </Card>
);

export default HomePage;