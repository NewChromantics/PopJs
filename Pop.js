if ( Pop != undefined )
	throw "Pop top level element already defined. Expected this to be first include.";

var Pop = {};

//	should be in PopHTML
if ( Pop.Debug === undefined && console.log )
{
	Pop.Debug = console.log;
}

//	append array to array in-place
//		this.splice( this.length-1, 0, ...AppendingArray );
//	is an alternative if you have es6
Array.prototype.pushArray = function(AppendingArray)
{
	let This = this;
	AppendingArray.forEach( Element => This.push(Element) );
}



//	https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
Object.deepCopy = function(Obj)
{
	return JSON.parse(JSON.stringify(Obj));
}

//	https://stackoverflow.com/a/14706877/355753
Object.isObject = function(obj)
{
	return typeof obj === 'function' || (typeof obj === 'object' && !!obj);
}



Math.clamp = function(min, max,Value)
{
	return Math.min( Math.max(Value, min), max);
}
Math.range = function(Min,Max,Value)
{
	return (Value-Min) / (Max-Min);
}
Math.rangeClamped = function(Min,Max,Value)
{
	return Math.clamp( 0, 1, Math.range( Min, Max, Value ) );
}



Math.Rect = function(x,y,w,h)
{
	//	assuming constructor passed a rect
	if ( Object.isObject(x) )
	{
		//Pop.Debug("Constructing rect from rect: " + JSON.stringify(x) );
		h = x.h;
		w = x.w;
		y = x.y;
		x = x.x;
	}
	
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	this.Split = function(Border,Columns,Rows)
	{
		let ParentRect = this;
		let ParentWidth = ParentRect.w;
		ParentWidth -= Border * (Columns-1);
		let BoxWidth = ParentWidth / Columns;
		//BoxWidth -= Border * (Columns-1);
		
		let ParentHeight = ParentRect.h;
		ParentHeight -= Border * (Rows-1);
		let BoxHeight = ParentHeight / Rows;
		//BoxHeight -= Border * (Rows-1);
		
		let Rects = [];
		
		let y = ParentRect.y + Border;
		for ( let r=0;	r<Rows;	r++ )
		{
			let x = ParentRect.x + Border;
			for ( let c=0;	c<Columns;	c++ )
			{
				let Rect = new Math.Rect( x, y, BoxWidth, BoxHeight );
				x += BoxWidth + Border;
				Rects.push( Rect );
			}
			y += Border + BoxHeight;
		}
		
		return Rects;
	}
}
