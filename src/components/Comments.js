import React  from 'react'
import { Card } from 'reactstrap';
import {  Fade, Stagger } from 'react-animation-components';

function Comments(comm) {
    var item=[];
    var p=comm.comments;
    console.log(comm);
    if(p !== undefined){
        for(var i=0;i<5;i++){
            item=item.concat(p[i]);
        }
        return (
        <Card>
        <h1>Comments</h1>
        <Stagger in>
                        {item.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
        </Card>
    );
}
    else{
        return(
            <div></div>
        )
    }
}

export default Comments
