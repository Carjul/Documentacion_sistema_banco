import React, { useEffect } from 'react';
import './App.css';
import imgARQ from './assets/diagram_arquitectura.png';
import imgEDR from './assets/diagram_er.png';
import imgDFG from './assets/gerente.png';
import imgDFA from './assets/asesor.png';
import imgDFC from './assets/cajero.png';

import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/atom-one-dark.css'; // Usa cualquier tema que prefieras

hljs.registerLanguage('sql', sql);

function App() {
    useEffect(() => {
        hljs.highlightAll(); // Resalta todos los bloques <code> cuando se renderiza el componente
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Sistema Bancario Distribuido</h1>
    {/*             <a href="https://portafolio-carlosramos.vercel.app/" target='_blank'><p>About me</p></a>
                <a href="https://github.com/Carjul" target='_blank'><p>Github</p></a> */}

            </header>

            <section>
                <h2>Descripción General</h2>
                <p>Desarrollar una base de datos distribuida para un sistema de gestión bancaria que permita a cada sucursal gestionar de forma independiente la información de sus clientes y cuentas bancarias, mientras que ciertos datos críticos deben estar disponibles y compartidos entre las sucursales. Además, se incluirá una gestión centralizada para operaciones comunes como préstamos, tarjetas de crédito y atención al cliente.
El sistema también debe garantizar altos niveles de seguridad, protegiendo la información sensible de los clientes, como cuentas, saldos y transacciones, a través de encriptación y control de accesos robustos.
</p>
            </section>

           

            <section>
            <h2>Arquitectura del Sistema</h2>
<p>
  Este sistema bancario utiliza una arquitectura de base de datos distribuida que combina una base de datos central y bases de datos en cada sucursal. 
  La base de datos central se encarga de gestionar la información crítica, como los préstamos y la atención al cliente, mientras que las sucursales almacenan y gestionan los datos específicos de sus clientes y cuentas.
</p>
<p>
  La comunicación entre la base de datos central y las bases de datos de las sucursales se realiza mediante la extensión <code>postgres_fdw</code>, que permite ejecutar consultas distribuidas y acceder a los datos de manera eficiente. 
  Esto asegura que todas las transacciones se registren y gestionen de forma coherente en todo el sistema.
</p>
 <h3>Diagrama Entidad-Relación (ER)</h3>
                <div className="diagram-container">
                    {/* Aquí insertarás tu imagen del diagrama ER */}
                    <img src={imgEDR} width='80%' alt="Diagrama Entidad-Relación" />
                </div>
                <h3>Diagrama de la Arquitectura</h3>
                <div className="diagram-container">
                    {/* Aquí insertarás tu imagen del diagrama de arquitectura */}
                    <img src={imgARQ} width='60%' height={'100%'} loading='lazy' alt="Diagrama de la Arquitectura" />
                </div>
                <h3>Diagrama de flujo gerente</h3>
                <div className="diagram-container">
                    {/* Aquí insertarás tu imagen del diagrama de arquitectura */}
                    <img src={imgDFG} width='60%' height={'100%'} loading='lazy' alt="Diagrama de la Arquitectura" />
                </div>
                <h3>Diagrama de flujo asesor_financiero</h3>
                <div className="diagram-container">
                    {/* Aquí insertarás tu imagen del diagrama de arquitectura */}
                    <img src={imgDFA} width='60%' height={'100%'} loading='lazy' alt="Diagrama de la Arquitectura" />
                </div>
                <h3>Diagrama flujo rol cajero</h3>
                <div className="diagram-container">
                    {/* Aquí insertarás tu imagen del diagrama de arquitectura */}
                    <img src={imgDFC} width='60%' height={'100%'} loading='lazy' alt="Diagrama de la Arquitectura" />
                </div>
            </section>
            <section>
                <h2>Diccionario de Datos</h2>
                <ul>
                    <li><strong>id_cliente</strong>: Identificador único del cliente (UUID).</li>
                    <li><strong>nombre_cliente</strong>: Nombre completo del cliente (VARCHAR).</li>
                    <li><strong>saldo</strong>: Saldo disponible en la cuenta del cliente (DECIMAL).</li>
                    <li><strong>tipo_cuenta</strong>: Tipo de cuenta (Ahorros, Corriente, Inversión).</li>
                    <li><strong>fecha_apertura</strong>: Fecha de apertura de la cuenta (DATE).</li>
                    <li><strong>id_sucursal</strong>: Identificador único de la sucursal (UUID).</li>
                    <li><strong>id_cuenta</strong>: Identificador único de la cuenta (UUID).</li>
                    <li><strong>id_transaccion</strong>: Identificador único de la transacción (UUID).</li>
                    <li><strong>tipo_transaccion</strong>: Tipo de transacción (Depósito, Retiro, Transferencia).</li>
                    <li><strong>monto</strong>: Monto de la transacción (DECIMAL).</li>
                    <li><strong>fecha</strong>: Fecha de la transacción (DATE).</li>
                    <li><strong>id_sucursal</strong>: Identificador único de la sucursal (UUID).</li>
                    <li><strong>id_ticket</strong>: Identificador único del ticket de atención al cliente (UUID).</li>
                    <li><strong>asunto</strong>: Descripción del asunto del ticket (TEXT).</li>
                    <li><strong>estado_ticket</strong>: Estado del ticket (Abierto, Cerrado, En Proceso).</li>
                    <li><strong>id_usuario</strong>: Identificador único del usuario (SERIAL).</li>
                    <li><strong>nombre_usuario</strong>: Nombre de usuario (VARCHAR).</li>
                    <li><strong>contraseña</strong>: Contraseña encriptada (TEXT).</li>
                    <li><strong>rol</strong>: Rol del usuario (cajero, asesor, gerente).</li>
                    <li><strong>creado_en</strong>: Fecha de creación del usuario (TIMESTAMP).</li>
                    <li><strong>id_prestamo</strong>: Identificador único del préstamo (UUID).</li>
                    <li><strong>monto</strong>: Monto del préstamo (DECIMAL).</li>
                    <li><strong>tasa_interes</strong>: Tasa de interés del préstamo (DECIMAL).</li>
                    <li><strong>fecha_aprobacion</strong>: Fecha de aprobación del préstamo (DATE).</li>
                    <li><strong>estado_prestamo</strong>: Estado del préstamo (VARCHAR).</li>
                    <li><strong>id_tarjeta</strong>: Identificador único de la tarjeta de crédito (UUID).</li>
                    <li><strong>limite_credito</strong>: Límite de crédito de la tarjeta (DECIMAL).</li>
                    <li><strong>saldo_disponible</strong>: Saldo disponible en la tarjeta (DECIMAL).</li>
                    <li><strong>fecha_emision</strong>: Fecha de emisión de la tarjeta (DATE).</li>
                    <li><strong>estado</strong>: Estado de la tarjeta (VARCHAR).</li>
                    <li><strong>audit_id</strong>: Identificador único de la entrada de auditoría (SERIAL).</li>
                    <li><strong>user_id</strong>: ID del usuario que realizó la acción (VARCHAR).</li>
                    <li><strong>action</strong>: Acción realizada (INSERT, UPDATE, DELETE).</li>
                    <li><strong>timestamp</strong>: Fecha y hora de la acción (TIMESTAMP).</li>
                    <li><strong>table_name</strong>: Nombre de la tabla afectada (VARCHAR).</li>
                    <li><strong>record_id</strong>: ID del registro afectado (UUID).</li>
                    <li><strong>old_data</strong>: Datos antiguos del registro (JSONB).</li>
                    <li><strong>new_data</strong>: Datos nuevos del registro (JSONB).</li>

                </ul>
            </section>
            <section>
                <h2>Distribución de Información</h2>
                <p>La información de los clientes, cuentas, y transacciones se almacena de manera distribuida entre las sucursales. Sin embargo, la base de datos central gestiona información crítica como préstamos, tarjetas de crédito, y auditorías globales. Las conexiones entre sucursales y la base de datos central se gestionan mediante Foreign Data Wrappers (FDW), permitiendo realizar consultas distribuidas.</p>
            </section>


            <section>
                <h2>Documentación de Seguridad</h2>
                <p>El sistema implementa seguridad a nivel de base de datos mediante el uso de contraseñas encriptadas con <code>bcrypt</code> en PostgreSQL, utilizando la extensión <code>pgcrypto</code>. Los roles tienen permisos diferenciados de acceso a las tablas para garantizar el control de acceso basado en roles. Además, se auditan todas las modificaciones a través de triggers que registran las operaciones en la tabla <code>audit_log</code>.</p>
            </section>
            <section>
                <h2>SQL Schema</h2>
                <p>
                    El siguiente esquema SQL describe las estructuras de las tablas, relaciones, y restricciones necesarias para implementar un sistema bancario distribuido.
                    Este esquema está diseñado para gestionar la información de los clientes, cuentas, transacciones, préstamos, tarjetas de crédito, y atención al cliente de forma distribuida entre diferentes sucursales y una base de datos central.
                    Además, incluye los mecanismos de seguridad, auditoría, y permisos basados en roles para garantizar un control seguro y eficiente del acceso a los datos.
                </p>
                <p>
                    Las sucursales tienen sus propias bases de datos para almacenar la información local, mientras que la base de datos central es responsable de la gestión de datos críticos y la sincronización entre sucursales mediante consultas distribuidas y funciones remotas.
                    Asegúrate de adaptar este esquema según los requisitos específicos de tu aplicación, como agregar nuevas restricciones, relaciones o índices según sea necesario. Tambien es necesario hacer esto como user superuser.
                </p>
            </section>
            
            <section className="sql-section">
                <h2 className="section-title">Tablas central</h2>
                <div className="mockup-code">
                    <pre><code className="language-sql">
                        {`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Habilitar la extensión uuid-ossp

-- Crear la tabla de Préstamos
CREATE TABLE Prestamos (
    id_prestamo UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID,
    monto DECIMAL(12, 2),
    tasa_interes DECIMAL(5, 2),
    fecha_aprobacion DATE, 
    estado_prestamo VARCHAR(50)
);

-- Crear la tabla de Tarjetas de Crédito
CREATE TABLE Tarjetas_Credito (
    id_tarjeta UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID,
    limite_credito DECIMAL(12, 2),
    saldo_disponible DECIMAL(12, 2),
    fecha_emision DATE DEFAULT CURRENT_DATE,
    estado VARCHAR(50)
);

-- Crear la tabla de Atención a Clientes
CREATE TABLE Atencion_Clientes (
    id_ticket UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID,
    fecha_ticket DATE DEFAULT CURRENT_DATE,
    asunto TEXT,
    estado_ticket VARCHAR(50) 
		CONSTRAINT estado_ticket_check CHECK (estado_ticket IN ('Abierto', 'Cerrado', 'En Proceso'))
);

-- Tabla de auditoría
CREATE TABLE audit_log (
    audit_id SERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    action VARCHAR(50),
    timestamp TIMESTAMP DEFAULT current_timestamp,
    table_name VARCHAR(50),
    record_id UUID,
    old_data JSONB,
    new_data JSONB
);

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,  -- Nombre del usuario
    contraseña TEXT NOT NULL,                    -- Contraseña encriptada
    rol VARCHAR(50) NOT NULL,                    -- Rol asignado (cajero, asesor, gerente)
    creado_en TIMESTAMP DEFAULT current_timestamp
);
`}
                    </code></pre>
                </div>
            </section>
            <section className="sql-section">
                <h2 className="section-title">Tablas Sucursal</h2>
                <div className="mockup-code">
                    <pre><code className="language-sql">
                        {`-- Tablas de cada sucursal (ej. en Sucursal 1)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  -- Habilitar la extensión uuid-ossp

-- Tabla de Sucursales
CREATE TABLE Sucursales (
    id_sucursal UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_sucursal VARCHAR(100),
    ubicacion VARCHAR(255)
);

-- Tabla de Clientes
CREATE TABLE Clientes (
    id_cliente UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_cliente VARCHAR(100),
    direccion VARCHAR(255),
    tel_cliente VARCHAR(20),
    correo_cliente VARCHAR(100),
	CONSTRAINT correo_cliente_check CHECK (correo_cliente ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') -- Validar formato de correo

);

-- Tabla de Cuentas
CREATE TABLE Cuentas (
    id_cuenta UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cliente UUID REFERENCES Clientes(id_cliente),
    tipo_cuenta VARCHAR(50),
    saldo DECIMAL(12, 2),
    fecha_apertura DATE DEFAULT CURRENT_DATE,
    id_sucursal UUID REFERENCES Sucursales(id_sucursal),
	CONSTRAINT tipo_cuenta_check CHECK (tipo_cuenta IN ('Ahorros', 'Corriente', 'Inversión')) -- Validar tipo de cuenta

);

-- Tabla de transacciones
CREATE TABLE Transacciones (
    id_transaccion UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_cuenta UUID REFERENCES Cuentas(id_cuenta),
    tipo_transaccion VARCHAR(50),
    monto DECIMAL(12, 2),
    fecha DATE DEFAULT CURRENT_DATE,
    id_sucursal UUID REFERENCES Sucursales(id_sucursal),
	CONSTRAINT tipo_transaccion_check CHECK (tipo_transaccion IN ('Depósito', 'Retiro', 'Transferencia')) -- Validar tipo de transacción

);

-- Tabla de auditoría
CREATE TABLE audit_log (
    audit_id SERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    action VARCHAR(50),
    timestamp TIMESTAMP DEFAULT current_timestamp,
    table_name VARCHAR(50),
    record_id UUID,
    old_data JSONB,
    new_data JSONB
);

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,  -- Nombre del usuario
    contraseña TEXT NOT NULL,                    -- Contraseña encriptada
    rol VARCHAR(50) NOT NULL,                    -- Rol asignado (cajero, asesor, gerente)
    creado_en TIMESTAMP DEFAULT current_timestamp
);

--Crea realaciones entre tablas
CREATE INDEX idx_cliente ON Cuentas(id_cliente);
CREATE INDEX idx_sucursal ON Cuentas(id_sucursal);
CREATE INDEX idx_transaccion_cuenta ON Transacciones(id_cuenta);

`}
                    </code></pre>
                </div>
            </section>
            
            <section className="sql-section">
                <h2 className="section-title">Funciones</h2>
                <div className="mockup-code">
                    <pre><code className="language-sql scrollable-section">{
                        
`
-- Función para auditar las operaciones en las tablas

CREATE OR REPLACE FUNCTION audit_function() RETURNS trigger AS $$
DECLARE
    key_field TEXT;
    key_value UUID; 
BEGIN
    -- Obtener el nombre del campo clave primario de la tabla afectada
    SELECT attname INTO key_field
    FROM pg_index i
    JOIN pg_attribute a ON a.attrelid = i.indrelid
    AND a.attnum = ANY(i.indkey)
    WHERE i.indrelid = TG_RELID
    AND i.indisprimary;

    -- Construir la clave primaria de manera dinámica usando EXECUTE
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        EXECUTE 'SELECT ($1).' || key_field INTO key_value USING NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        EXECUTE 'SELECT ($1).' || key_field INTO key_value USING OLD;
    END IF;

    -- Registrar la operación de INSERT
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO public.audit_log(user_id, action, timestamp, table_name, record_id, new_data)
        VALUES (current_user, TG_OP, current_timestamp, TG_TABLE_NAME, key_value, row_to_json(NEW));
        RETURN NEW;
    -- Registrar la operación de UPDATE
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO public.audit_log(user_id, action, timestamp, table_name, record_id, old_data, new_data)
        VALUES (current_user, TG_OP, current_timestamp, TG_TABLE_NAME, key_value, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    -- Registrar la operación de DELETE
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO public.audit_log(user_id, action, timestamp, table_name, record_id, old_data)
        VALUES (current_user, TG_OP, current_timestamp, TG_TABLE_NAME, key_value, row_to_json(OLD));
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;


-----------------------------------------------------------------------------------------------------------------
-- Function crear_usuario con bcrypt para encriptar contraseñas, asignar roles en la central y sucursal.

CREATE OR REPLACE FUNCTION crear_usuario(
    p_nombre_usuario VARCHAR(50),
    p_contraseña VARCHAR(50),
    p_rol VARCHAR(50)
) RETURNS VOID AS $$
DECLARE
    v_role_exists BOOLEAN;
BEGIN
    -- Verificar que la extensión pgcrypto está instalada
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    
    -- Verificar que el rol proporcionado sea válido
    IF p_rol NOT IN ('cajero', 'asesor_financiero', 'gerente') THEN
        RAISE EXCEPTION 'Rol no válido. Los roles permitidos son: cajero, asesor_financiero, gerente';
    END IF;
    
    -- Verificar si el rol existe en la base de datos
    SELECT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = p_rol) INTO v_role_exists;
    
    IF NOT v_role_exists THEN
        RAISE EXCEPTION 'El rol % no existe en la base de datos', p_rol;
    END IF;
    
    -- Insertar el nuevo usuario con la contraseña encriptada usando bcrypt
    INSERT INTO Usuarios (nombre_usuario, contraseña, rol)
    VALUES (p_nombre_usuario, crypt(p_contraseña, gen_salt('bf')), p_rol);
    
    -- Crear el usuario en PostgreSQL si no existe
    PERFORM 1 FROM pg_user WHERE usename = p_nombre_usuario;
    IF NOT FOUND THEN
        EXECUTE format('CREATE USER %I WITH PASSWORD %L', p_nombre_usuario, p_contraseña);
    ELSE
        EXECUTE format('ALTER USER %I WITH PASSWORD %L', p_nombre_usuario, p_contraseña);
    END IF;

    -- Asignar el rol existente al nuevo usuario
    EXECUTE format('GRANT %I TO %I', p_rol, p_nombre_usuario);
    
    -- Notificación de éxito
    RAISE NOTICE 'Usuario % creado con éxito y asignado al rol %', p_nombre_usuario, p_rol;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso
SELECT crear_usuario('cajero2', 'contraseña_segura', 'cajero');

-----------------------------------------------------------------------------------------------------------------

-- Function cambiar_contraseña para cambiar la contraseña de un usuario en la central y sucursales.

CREATE OR REPLACE FUNCTION cambiar_contraseña(
    p_nombre_usuario VARCHAR(50),
    p_contraseña_antigua VARCHAR(50),
    p_contraseña_nueva VARCHAR(50)
) RETURNS VOID AS $$
DECLARE
    v_contraseña_actual VARCHAR(60);
BEGIN
    -- Obtener la contraseña actual del usuario
    SELECT contraseña INTO v_contraseña_actual
    FROM Usuarios
    WHERE nombre_usuario = p_nombre_usuario;

    -- Verificar si el usuario existe
    IF v_contraseña_actual IS NULL THEN
        RAISE EXCEPTION 'Usuario no encontrado';
    END IF;

    -- Verificar si la contraseña antigua es correcta
    IF v_contraseña_actual != crypt(p_contraseña_antigua, v_contraseña_actual) THEN
        RAISE EXCEPTION 'Contraseña antigua incorrecta';
    END IF;

    -- Actualizar la contraseña en la tabla Usuarios
    UPDATE Usuarios
    SET contraseña = crypt(p_contraseña_nueva, gen_salt('bf'))
    WHERE nombre_usuario = p_nombre_usuario;

    -- Actualizar la contraseña del rol en PostgreSQL
    EXECUTE format('ALTER ROLE %I PASSWORD %L', p_nombre_usuario, p_contraseña_nueva);

    -- Mensaje de éxito
    RAISE NOTICE 'Contraseña cambiada con éxito para el usuario %', p_nombre_usuario;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso:
SELECT cambiar_contraseña('cajero1', 'contraseña_inicial', 'nueva_contraseña');

-----------------------------------------------------------------------------------------------------------------

-- Función para crear una conexión remota a la central

CREATE OR REPLACE FUNCTION create_remote_central_connection(
    p_server_name TEXT,
    p_host TEXT,
    p_dbname TEXT,
    p_port TEXT,
    p_user TEXT,
    p_password TEXT,
    p_local_user TEXT,
    p_schema TEXT,
    p_tables TEXT[]
)
RETURNS VOID AS $$
DECLARE
    fdw_exists BOOLEAN;
    server_exists BOOLEAN;
    table_list TEXT;
BEGIN
    -- Check if postgres_fdw extension exists
    SELECT EXISTS (
        SELECT 1 FROM pg_extension WHERE extname = 'postgres_fdw'
    ) INTO fdw_exists;

    -- Install postgres_fdw if it doesn't exist
    IF NOT fdw_exists THEN
        CREATE EXTENSION postgres_fdw;
    END IF;

    -- Check if the server already exists
    SELECT EXISTS (
        SELECT 1 FROM pg_foreign_server WHERE srvname = p_server_name
    ) INTO server_exists;

    -- Create the foreign server if it doesn't exist
    IF NOT server_exists THEN
        EXECUTE format('
            CREATE SERVER %I
            FOREIGN DATA WRAPPER postgres_fdw
            OPTIONS (host %L, dbname %L, port %L)
        ', p_server_name, p_host, p_dbname, p_port);
    ELSE
        -- Update the server if it already exists
        EXECUTE format('
            ALTER SERVER %I
            OPTIONS (SET host %L, SET dbname %L, SET port %L)
        ', p_server_name, p_host, p_dbname, p_port);
    END IF;

    -- Create or update the user mapping
    EXECUTE format('
        CREATE USER MAPPING IF NOT EXISTS FOR %I
        SERVER %I
        OPTIONS (user %L, password %L)
    ', p_local_user, p_server_name, p_user, p_password);

    -- Prepare the table list for IMPORT FOREIGN SCHEMA
    IF array_length(p_tables, 1) > 0 THEN
        table_list := 'LIMIT TO (' || array_to_string(p_tables, ', ') || ')';
    ELSE
        table_list := '';
    END IF;

    -- Import the foreign schema
    EXECUTE format('
        IMPORT FOREIGN SCHEMA %I %s
        FROM SERVER %I
        INTO %I
    ', p_schema, table_list, p_server_name, p_schema);

    RAISE NOTICE 'Remote connection created successfully for server: %', p_server_name;
EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'Error creating remote connection: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

--ejemplo de uso
SELECT create_remote_central_connection(
    'banco_central',           -- server name
    '172.18.0.1',              -- host
    'CentralBanco',            -- database name
    '5432',                    -- port
    'admin',                   -- remote user
    '12345',                   -- password
    'admin',                   -- local user
    'public',                  -- schema
    ARRAY['Prestamos', 'Atencion_Clientes', 'Tarjetas_Credito']  -- tables to import
);

-----------------------------------------------------------------------------------------------------------------

-- Función para crear una conexión remota a una sucursal y se crea un nuevo esquema en la central con el server name para evitar coliciones.

CREATE OR REPLACE FUNCTION create_remote_sucursal_connection(
    p_server_name TEXT,
    p_host TEXT,
    p_dbname TEXT,
    p_port TEXT,
    p_remote_user TEXT,
    p_remote_password TEXT,
    p_local_user TEXT,
    p_tables TEXT[]
)
RETURNS VOID AS $$
DECLARE
    fdw_exists BOOLEAN;
    server_exists BOOLEAN;
    user_mapping_exists BOOLEAN;
    schema_name TEXT;
    table_list TEXT;
    drop_query TEXT;
    foreign_table RECORD;
BEGIN
    -- Set the schema name
    schema_name :=  p_server_name;

    -- Check if postgres_fdw extension exists
    SELECT EXISTS (
        SELECT 1 FROM pg_extension WHERE extname = 'postgres_fdw'
    ) INTO fdw_exists;

    -- Install postgres_fdw if it doesn't exist
    IF NOT fdw_exists THEN
        EXECUTE 'CREATE EXTENSION postgres_fdw';
    END IF;

    -- Check if the server already exists
    SELECT EXISTS (
        SELECT 1 FROM pg_foreign_server WHERE srvname = p_server_name
    ) INTO server_exists;

    -- Create or update the foreign server
    IF NOT server_exists THEN
        EXECUTE format('
            CREATE SERVER %I
            FOREIGN DATA WRAPPER postgres_fdw
            OPTIONS (host %L, dbname %L, port %L)
        ', p_server_name, p_host, p_dbname, p_port);
    ELSE
        EXECUTE format('
            ALTER SERVER %I
            OPTIONS (SET host %L, SET dbname %L, SET port %L)
        ', p_server_name, p_host, p_dbname, p_port);
    END IF;

    -- Check if user mapping exists
    SELECT EXISTS (
        SELECT 1 FROM pg_user_mappings
        WHERE srvname = p_server_name AND usename = p_local_user
    ) INTO user_mapping_exists;

    -- Create or update the user mapping
    IF user_mapping_exists THEN
        EXECUTE format('
            ALTER USER MAPPING FOR %I
            SERVER %I
            OPTIONS (SET user %L, SET password %L)
        ', p_local_user, p_server_name, p_remote_user, p_remote_password);
    ELSE
        EXECUTE format('
            CREATE USER MAPPING FOR %I
            SERVER %I
            OPTIONS (user %L, password %L)
        ', p_local_user, p_server_name, p_remote_user, p_remote_password);
    END IF;

    -- Create the schema if it doesn't exist
    EXECUTE format('
        CREATE SCHEMA IF NOT EXISTS %I
    ', schema_name);

    -- Prepare the table list for IMPORT FOREIGN SCHEMA
    IF array_length(p_tables, 1) > 0 THEN
        table_list := 'LIMIT TO (' || array_to_string(p_tables, ', ') || ')';
    ELSE
        table_list := '';
    END IF;

    -- Drop existing foreign tables in the target schema
    FOR foreign_table IN 
        SELECT foreign_table_name
        FROM information_schema.foreign_tables 
        WHERE foreign_table_schema = schema_name
    LOOP
        drop_query := format('DROP FOREIGN TABLE IF EXISTS %I.%I CASCADE', schema_name, foreign_table.foreign_table_name);
        EXECUTE drop_query;
    END LOOP;

    -- Import the foreign schema
    EXECUTE format('
        IMPORT FOREIGN SCHEMA public %s
        FROM SERVER %I
        INTO %I
    ', table_list, p_server_name, schema_name);

    RAISE NOTICE 'Remote connection created successfully for server: % in schema: %', p_server_name, schema_name;
EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'Error creating remote connection: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

--ejemplo de instanciar function
SELECT create_remote_sucursal_connection(
    'sucursal_1',              -- server name
    '172.18.0.1',              -- host
    'SucursalBanco',           -- database name
    '5433',                    -- port
    'admin',                   -- remote user
    '12345',                   -- remote password
    'admin',                   -- local user
    ARRAY['Clientes', 'Cuentas', 'Transacciones']  -- tables to import
);

-----------------------------------------------------------------------------------------------------------------


--Funcion validar cuenta se usa para buscar la exixtencia del cliente para la integridad de los datos en la centrañ

CREATE OR REPLACE FUNCTION validar_cuenta_remota()
RETURNS TRIGGER AS $$
DECLARE
    cuenta_existente UUID;
    esquema TEXT;
    query TEXT;
BEGIN
    -- Recorrer todos los esquemas que no sean "public"
    FOR esquema IN
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name <> 'public'
    LOOP
        -- Construir la consulta dinámica para verificar en la tabla "Cuentas" de cada esquema
        query := format('SELECT id_cliente FROM %I.Cuentas WHERE id_cliente = $1', esquema);

        -- Ejecutar la consulta en cada esquema
        EXECUTE query INTO cuenta_existente USING NEW.id_cliente;

        -- Si encuentra la cuenta, salir del loop
        IF cuenta_existente IS NOT NULL THEN
            EXIT;
        END IF;
    END LOOP;

    -- Si no se encontró en ningún esquema, lanzar un error
    IF cuenta_existente IS NULL THEN
        RAISE EXCEPTION 'No existe una cuenta para el cliente con id % en ninguna sucursal', NEW.id_cliente;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------------

-- Function para depositar dinero en cuentas de una suscursal.

CREATE OR REPLACE FUNCTION Depositar(
    _id_cuenta UUID,
    _monto DECIMAL(12,2),
    _id_sucursal UUID
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
    _id_transaccion UUID;
BEGIN
    -- Verificar que la cuenta exista y pertenezca a la sucursal
    IF NOT EXISTS (SELECT 1 FROM Cuentas WHERE id_cuenta = _id_cuenta AND id_sucursal = _id_sucursal) THEN
        RAISE EXCEPTION 'La cuenta no existe o no pertenece a esta sucursal';
    END IF;

    -- Generar un nuevo UUID para la transacción
    _id_transaccion := uuid_generate_v4();

    -- Registrar la transacción
    INSERT INTO Transacciones (id_transaccion, id_cuenta, tipo_transaccion, monto, fecha, id_sucursal)
    VALUES (_id_transaccion, _id_cuenta, 'Depósito', _monto, CURRENT_DATE, _id_sucursal);

    -- Incrementar el saldo de la cuenta
    UPDATE Cuentas SET saldo = saldo + _monto WHERE id_cuenta = _id_cuenta;

    -- Retornar el ID de la transacción
    RETURN _id_transaccion;

EXCEPTION 
    WHEN OTHERS THEN
        -- La transacción se revierte automáticamente aquí
        RAISE;
END;
$$;

-- Ejemplo de uso:
SELECT * FROM Depositar('uuid_cuenta', 'monto', 'uuid_sucursal');

-----------------------------------------------------------------------------------------------------------------

-- Function para retira dinero en cuentas de una suscursal.

CREATE OR REPLACE FUNCTION public.retiro(
	_id_cuenta uuid,
	_monto numeric,
	_id_sucursal uuid)
    RETURNS uuid
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    _id_transaccion UUID;
    _saldo_actual DECIMAL(12,2);
BEGIN
    -- Verificar que la cuenta exista y pertenezca a la sucursal
    IF NOT EXISTS (SELECT 1 FROM Cuentas WHERE id_cuenta = _id_cuenta AND id_sucursal = _id_sucursal) THEN
        RAISE EXCEPTION 'La cuenta no existe o no pertenece a esta sucursal';
    END IF;

    -- Obtener el saldo actual de la cuenta
    SELECT saldo INTO _saldo_actual FROM Cuentas WHERE id_cuenta = _id_cuenta;

    -- Verificar si hay fondos suficientes
    IF _saldo_actual < _monto THEN
        RAISE EXCEPTION 'Saldo insuficiente para realizar el retiro';
    END IF;

    -- Generar un nuevo UUID para la transacción
    _id_transaccion := uuid_generate_v4();

    -- Registrar la transacción
    INSERT INTO Transacciones (id_transaccion, id_cuenta, tipo_transaccion, monto, fecha, id_sucursal)
    VALUES (_id_transaccion, _id_cuenta, 'Retiro', _monto * 1, CURRENT_DATE, _id_sucursal);

    -- Decrementar el saldo de la cuenta
    UPDATE Cuentas SET saldo = saldo - _monto WHERE id_cuenta = _id_cuenta;

    -- Retornar el ID de la transacción
    RETURN _id_transaccion;

EXCEPTION 
    WHEN OTHERS THEN
        -- La transacción se revierte automáticamente aquí
        RAISE;
END;
$BODY$;

-- Ejemplo de uso:

SELECT * FROM public.retiro('uuid_cuenta', 'monto', 'uuid_sucursal');

-----------------------------------------------------------------------------------------------------------------

-- function transferencía entre cuentas de diferente sucursal, desde db central.

CREATE OR REPLACE FUNCTION transferencia_interbancaria(
    p_id_cuenta_origen UUID,
    p_id_cuenta_destino UUID,
    p_monto DECIMAL
) RETURNS VOID AS $$
DECLARE
    esquema TEXT;
    saldo_origen DECIMAL;
    cuenta_encontrada BOOLEAN := FALSE;
    cuenta_destino_encontrada BOOLEAN := FALSE;
    id_sucursal_origen UUID;
    id_sucursal_destino UUID;
BEGIN
    -- Iniciar la transacción
    RAISE NOTICE 'Iniciando la transacción de % a % por un monto de %', p_id_cuenta_origen, p_id_cuenta_destino, p_monto;
    
    -- Recorrer todos los esquemas que no sean esquemas del sistema (sólo esquemas de sucursales)
    FOR esquema IN
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name NOT IN ('public', 'information_schema', 'pg_catalog', 'pg_toast', 'pg_temp_1', 'pg_toast_temp_1')
    LOOP
        RAISE NOTICE 'Iterando esquema: %', esquema;

        -- Verificar si la cuenta de origen está en este esquema
        EXECUTE format('SELECT saldo, id_sucursal FROM %I.Cuentas WHERE id_cuenta = $1', esquema)
        INTO saldo_origen, id_sucursal_origen
        USING p_id_cuenta_origen;

        IF saldo_origen IS NOT NULL THEN
            cuenta_encontrada := TRUE;
            RAISE NOTICE 'Cuenta de origen encontrada en el esquema % con saldo: %', esquema, saldo_origen;
            
            -- Verificar si hay saldo suficiente en la cuenta de origen
            IF saldo_origen < p_monto THEN
                RAISE EXCEPTION 'Saldo insuficiente en la cuenta de origen';
            END IF;

            -- Restar el monto en la cuenta de origen
            EXECUTE format('UPDATE %I.Cuentas SET saldo = saldo - $1 WHERE id_cuenta = $2', esquema)
            USING p_monto, p_id_cuenta_origen;

            RAISE NOTICE 'Saldo actualizado en la cuenta de origen en el esquema %', esquema;

            -- Registrar la transacción en la tabla de Transacciones del esquema de la cuenta de origen con monto negativo
            EXECUTE format('INSERT INTO %I.Transacciones (id_transaccion, id_cuenta, tipo_transaccion, monto, fecha, id_sucursal) 
                            VALUES (uuid_generate_v4(), $1, ''Transferencia'', $2 * -1, CURRENT_DATE, $3)', esquema)
            USING p_id_cuenta_origen, p_monto, id_sucursal_origen;

            RAISE NOTICE 'Transacción de retiro registrada en el esquema % con monto negativo', esquema;
        END IF;

        -- Verificar si la cuenta de destino está en este esquema
        EXECUTE format('SELECT saldo, id_sucursal FROM %I.Cuentas WHERE id_cuenta = $1', esquema)
        INTO saldo_origen, id_sucursal_destino
        USING p_id_cuenta_destino;

        IF saldo_origen IS NOT NULL THEN
            cuenta_destino_encontrada := TRUE;
            RAISE NOTICE 'Cuenta de destino encontrada en el esquema % con saldo: %', esquema, saldo_origen;

            -- Sumar el monto en la cuenta de destino
            EXECUTE format('UPDATE %I.Cuentas SET saldo = saldo + $1 WHERE id_cuenta = $2', esquema)
            USING p_monto, p_id_cuenta_destino;

            RAISE NOTICE 'Saldo actualizado en la cuenta de destino en el esquema %', esquema;

            -- Registrar la transacción en la tabla de Transacciones del esquema de la cuenta de destino
            EXECUTE format('INSERT INTO %I.Transacciones (id_transaccion, id_cuenta, tipo_transaccion, monto, fecha, id_sucursal) 
                            VALUES (uuid_generate_v4(), $1, ''Transferencia'', $2, CURRENT_DATE, $3)', esquema)
            USING p_id_cuenta_destino, p_monto, id_sucursal_destino;

            RAISE NOTICE 'Transacción de depósito registrada en el esquema %', esquema;
        END IF;
    END LOOP;

    -- Verificar si las cuentas fueron encontradas
    IF NOT cuenta_encontrada THEN
        RAISE EXCEPTION 'La cuenta de origen no se encontró en ninguna sucursal';
    ELSIF NOT cuenta_destino_encontrada THEN
        RAISE EXCEPTION 'La cuenta de destino no se encontró en ninguna sucursal';
    END IF;

    -- Transacción completada con éxito
    RAISE NOTICE 'Transacción completada con éxito entre las cuentas % y %', p_id_cuenta_origen, p_id_cuenta_destino;

EXCEPTION
    WHEN OTHERS THEN
        -- Si algo sale mal, lanzar el error
        RAISE NOTICE 'Ocurrió un error durante la transacción.';
        RAISE;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso
SELECT transferencia_interbancaria(
    p_id_cuenta_origen UUID,
    p_id_cuenta_destino UUID,
    p_monto DECIMAL
)

-----------------------------------------------------------------------------------------------------------------

--Function para  buscar un cliente de todas las sucursales desde central.

CREATE OR REPLACE FUNCTION buscar_cliente_en_sucursales(p_id_cliente UUID)
RETURNS TABLE (
    sucursal TEXT,
    id_cliente UUID,
    nombre_cliente VARCHAR,
    direccion VARCHAR,
    tel_cliente VARCHAR,
    correo_cliente VARCHAR
) AS $$
DECLARE
    esquema TEXT;
BEGIN
    -- Iterar sobre todos los esquemas que no son esquemas del sistema
    FOR esquema IN
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name NOT IN ('public', 'information_schema', 'pg_catalog', 'pg_toast', 'pg_temp_1', 'pg_toast_temp_1')
    LOOP
        -- Ejecutar consulta para cada esquema y devolver la información del cliente
        RETURN QUERY EXECUTE format(
            'SELECT %L AS sucursal, c.id_cliente, c.nombre_cliente, c.direccion, c.tel_cliente, c.correo_cliente
             FROM %I.Clientes c WHERE c.id_cliente = $1', esquema, esquema)
        USING p_id_cliente;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

--  Ejemplo de uso:

SELECT * FROM buscar_cliente_en_sucursales('id_cliente');

-----------------------------------------------------------------------------------------------------------------

--Function para obtener transaciones en todas las sucursales desde central.

CREATE OR REPLACE FUNCTION obtener_transacciones_sucursales(p_tipo_transaccion VARCHAR)
RETURNS TABLE (
    sucursal TEXT,
    id_transaccion UUID,
    monto DECIMAL,
    fecha DATE,
    id_cuenta UUID
) AS $$
DECLARE
    esquema TEXT;
BEGIN
    -- Iterar sobre todos los esquemas que no son esquemas del sistema
    FOR esquema IN
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name NOT IN ('public', 'information_schema', 'pg_catalog', 'pg_toast', 'pg_temp_1', 'pg_toast_temp_1')
    LOOP
        -- Ejecutar consulta para cada esquema y devolver las transacciones, convirtiendo el timestamp a date
        RETURN QUERY EXECUTE format(
            'SELECT %L AS sucursal, t.id_transaccion, t.monto, t.fecha::date, t.id_cuenta
             FROM %I.Transacciones t WHERE t.tipo_transaccion = $1', esquema, esquema)
        USING p_tipo_transaccion;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso:

SELECT * FROM obtener_transacciones_sucursales('tipo transacción');

-----------------------------------------------------------------------------------------------------------------

--Function para obtener saldo total del banco por sucursal.

CREATE OR REPLACE FUNCTION obtener_saldo_total_sucursales()
RETURNS TABLE (
    sucursal TEXT,
    saldo_total DECIMAL
) AS $$
DECLARE
    esquema TEXT;
BEGIN
    -- Iterar sobre todos los esquemas que no son esquemas del sistema
    FOR esquema IN
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name NOT IN ('public', 'information_schema', 'pg_catalog', 'pg_toast', 'pg_temp_1', 'pg_toast_temp_1')
    LOOP
        -- Ejecutar consulta para cada esquema y devolver el saldo total por sucursal
        RETURN QUERY EXECUTE format(
            'SELECT %L AS sucursal, SUM(c.saldo) AS saldo_total
             FROM %I.Cuentas c', esquema, esquema);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso:

SELECT * FROM obtener_saldo_total_sucursales();


`}</code>
</pre>
                </div>
            </section>
            <section className="sql-section">
                <h2 className="section-title">Triggers</h2>
                <div className="mockup-code">
                    <pre><code className="language-sql">{`
-- Trigger para auditar las operaciones en las tablas de la base de datos central


CREATE TRIGGER atencion_clientes_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Atencion_Clientes
FOR EACH ROW
EXECUTE FUNCTION audit_function();

CREATE TRIGGER prestamos_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Prestamos
FOR EACH ROW
EXECUTE FUNCTION audit_function();

CREATE TRIGGER tarjetas_credido_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Tarjetas_Credito
FOR EACH ROW
EXECUTE FUNCTION audit_function();


-- Trigger para ejecutar validar cliente antes de insertar en tablas de la central.

CREATE TRIGGER trigger_validar_cuenta_remota
BEFORE INSERT ON Prestamos
FOR EACH ROW
EXECUTE FUNCTION validar_cuenta_remota();

CREATE TRIGGER trigger_validar_cuenta_remota
BEFORE INSERT ON  Tarjetas_Credito
FOR EACH ROW
EXECUTE FUNCTION validar_cuenta_remota();

CREATE TRIGGER trigger_validar_cuenta_remota
BEFORE INSERT ON Atencion_Clientes
FOR EACH ROW
EXECUTE FUNCTION validar_cuenta_remota();

-- Trigger para auditar las operaciones en las tablas de la base de datos sucursal

CREATE TRIGGER transacciones_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Transacciones
FOR EACH ROW
EXECUTE FUNCTION audit_function();

CREATE TRIGGER cuentas_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Cuentas
FOR EACH ROW
EXECUTE FUNCTION audit_function();

CREATE TRIGGER cuentas_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Clientes
FOR EACH ROW
EXECUTE FUNCTION audit_function();

CREATE TRIGGER cuentas_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Sucursales
FOR EACH ROW
EXECUTE FUNCTION audit_function();

          `}</code></pre>
                </div>
            </section>

            <section className="sql-section">
                <h2 className="section-title">Roles Sistema Bancarío</h2>
                <div className="mockup-code">
                    <pre><code className="language-sql">{`
-- Roles en la base de datos central, es repetitivo asignar roles, ya qué se debe tener en cuenta la seguridad de los datos y qué estos se deben crear en cada sucarsal nueva.
-- Nota: Debido al diseño y funcionamiento de la base de datos central, se recomienda asignar roles en las sucursales y usar rol postgres para consultas centalizadas.

--------------------------------------------------------------------------------------------------------------------------

-- Roles en las bases de datos de las sucursales
-- Nota: Se debe conectar la base de datos central con las sucursales para asignar los roles.

-- Rol Cajero
CREATE ROLE cajero LOGIN PASSWORD 'password_cajero'; -- Reemplazar con una contraseña segura
GRANT SELECT ON Cuentas, Sucursales, Clientes, Usuarios TO cajero;
GRANT  UPDATE ON Usuarios, Cuentas TO cajero;
GRANT INSERT ON Atencion_Clientes TO cajero;  -- Permite registrar tickets
GRANT SELECT, INSERT, UPDATE ON Transacciones TO cajero;
GRANT SELECT, INSERT, UPDATE ON Audit_Log TO cajero;
GRANT EXECUTE ON FUNCTION Depositar(UUID, DECIMAL, UUID) TO cajero;
GRANT EXECUTE ON FUNCTION retiro(UUID, DECIMAL, UUID) TO cajero;
GRANT EXECUTE ON FUNCTION cambiar_contraseña(VARCHAR, VARCHAR, VARCHAR) TO cajero; -- Permiso para cambiar contraseña
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cajero;


-- Rol Asesor Financiero
CREATE ROLE asesor_financiero LOGIN PASSWORD 'password_asesor'; -- Reemplazar con una contraseña segura
GRANT SELECT, INSERT, UPDATE ON Clientes, Cuentas, Prestamos, Tarjetas_Credito, Atencion_Clientes, Audit_Log  TO asesor_financiero;
GRANT SELECT, UPDATE ON Usuarios TO asesor_financiero;
GRANT SELECT ON Transacciones, Sucursales TO asesor_financiero;
GRANT EXECUTE ON FUNCTION cambiar_contraseña(VARCHAR, VARCHAR, VARCHAR) TO asesor_financiero; -- Permiso para cambiar contraseña
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO asesor_financiero;


-- Rol Gerente (permisos completos)
CREATE ROLE gerente LOGIN PASSWORD 'password_gerente'; -- Reemplazar con una contraseña segura
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gerente;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gerente;
GRANT SELECT, INSERT, UPDATE ON Usuarios TO gerente;
GRANT SELECT, INSERT, UPDATE ON Audit_Log TO gerente;
GRANT EXECUTE ON FUNCTION crear_usuario(VARCHAR, VARCHAR, VARCHAR) TO gerente; -- Permiso para crear usuarios
GRANT EXECUTE ON FUNCTION cambiar_contraseña(VARCHAR, VARCHAR, VARCHAR) TO gerente; -- Permiso para cambiar contraseña



                    `}
                    </code></pre>
                </div>
            </section>
        

            <section className="sql-section">
                <h2 className="section-title">Consultas</h2>
                <div className="mockup-code"> 
                    <pre><code className="language-sql">{`

-- 1. Consulta para verificar los datos de una cuenta específica por cliente

SELECT c.nombre_cliente, cu.id_cuenta , cu.tipo_cuenta, cu.saldo
FROM Clientes c
JOIN Cuentas cu ON c.id_cliente = cu.id_cliente
WHERE c.id_cliente = 'UUID'; --id cliente 

-- 2. Consulta para validar las transacciones de una cuenta en un periodo de tiempo

SELECT t.id_transaccion, t.tipo_transaccion, t.monto, t.fecha, s.nombre_sucursal
FROM public.transacciones t
JOIN public.sucursales s ON t.id_sucursal = s.id_sucursal
WHERE t.id_cuenta = 'UUID'  -- Reemplaza con el UUID de la cuenta
AND t.fecha BETWEEN DATE '2024-01-01' AND DATE '2025-12-31'  -- Comparación de fechas con timestamps
ORDER BY t.fecha ASC;

-- 3. Consulta para verificar el estado de un préstamo de un cliente

SELECT p.id_prestamo, p.monto, p.tasa_interes, p.fecha_aprobacion, p.estado_prestamo
FROM Prestamos p
JOIN Clientes c ON p.id_cliente = c.id_cliente
WHERE p.id_cliente = 'uuid_cliente';

-- 4. Consulta para comprobar el saldo disponible de las tarjetas de crédito de un cliente

SELECT c.nombre_cliente, tc.id_tarjeta, tc.limite_credito, tc.saldo_disponible, tc.estado
FROM Tarjetas_Credito tc
JOIN Clientes c ON tc.id_cliente = c.id_cliente
WHERE tc.id_cliente = 'uuid_cliente';

-- 5. Consulta para verificar las solicitudes de atención al cliente abiertas

SELECT ac.id_ticket, c.id_cliente, c.nombre_cliente, ac.fecha_ticket, ac.asunto, ac.estado_ticket
FROM Atencion_Clientes ac
JOIN Clientes c ON ac.id_cliente = c.id_cliente
WHERE ac.estado_ticket = 'Abierto' -- WHERE ac.estado_ticket IN ('Abierto', 'Cerrado', 'En Proceso')
ORDER BY ac.fecha_ticket ASC;

-- 6. Consulta para obtener el saldo total de todas las cuentas en una sucursal

SELECT c.id_cuenta, cl.nombre_cliente, c.tipo_cuenta, c.saldo
FROM Cuentas c
JOIN Clientes cl ON c.id_cliente = cl.id_cliente
ORDER BY c.saldo DESC;

          `}</code></pre>
                </div>
            </section>

            <section className="sql-section">
                <h2 className="section-title">Scripts SELECT INSERT UPDATE DELETE</h2>
                <div className="mockup-code">
                    <pre><code className="language-sql scrollable-section">
                        {`
                        -- Tablas Centrales

-- Préstamos CRUD
-- Create
INSERT INTO Prestamos (id_cliente, monto, tasa_interes, fecha_aprobacion, estado_prestamo)
VALUES (uuid_generate_v4(), 10000.00, 5.5, CURRENT_DATE, 'Aprobado');

-- Read
SELECT * FROM Prestamos WHERE id_prestamo = 'uuid_here';

-- Update
UPDATE Prestamos
SET monto = 12000.00, tasa_interes = 6.0, estado_prestamo = 'En curso'
WHERE id_prestamo = 'uuid_here';

-- Delete
DELETE FROM Prestamos WHERE id_prestamo = 'uuid_here';

-- Tarjetas de Crédito CRUD
-- Create
INSERT INTO Tarjetas_Credito (id_cliente, limite_credito, saldo_disponible, fecha_emision, estado)
VALUES (uuid_generate_v4(), 5000.00, 5000.00, CURRENT_DATE, 'Activa');

-- Read
SELECT * FROM Tarjetas_Credito WHERE id_tarjeta = 'uuid_here';

-- Update
UPDATE Tarjetas_Credito
SET limite_credito = 6000.00, saldo_disponible = 5500.00, estado = 'Bloqueada'
WHERE id_tarjeta = 'uuid_here';

-- Delete
DELETE FROM Tarjetas_Credito WHERE id_tarjeta = 'uuid_here';

-- Atención a Clientes CRUD
-- Create
INSERT INTO Atencion_Clientes (id_cliente, fecha_ticket, asunto, estado_ticket)
VALUES (uuid_generate_v4(), CURRENT_DATE, 'Consulta sobre préstamo', 'Abierto');

-- Read
SELECT * FROM Atencion_Clientes WHERE id_ticket = 'uuid_here';

-- Update
UPDATE Atencion_Clientes
SET asunto = 'Actualización de consulta sobre préstamo', estado_ticket = 'En Proceso'
WHERE id_ticket = 'uuid_here';

-- Delete
DELETE FROM Atencion_Clientes WHERE id_ticket = 'uuid_here';

-- Audit Log CRUD
-- Create (normalmente se hace automáticamente, pero aquí hay un ejemplo manual)
INSERT INTO audit_log (user_id, action, table_name, record_id, old_data, new_data)
VALUES ('user123', 'UPDATE', 'Prestamos', 'uuid_here', 
        '{"monto": 10000.00}'::jsonb, 
        '{"monto": 12000.00}'::jsonb);

-- Read
SELECT * FROM audit_log WHERE audit_id = 1;

-- Update (normalmente no se actualizaría un registro de auditoría, pero aquí hay un ejemplo)
UPDATE audit_log
SET action = 'DELETE'
WHERE audit_id = 1;

-- Delete (normalmente no se eliminarían registros de auditoría, pero aquí hay un ejemplo)
DELETE FROM audit_log WHERE audit_id = 1;

-- Usuarios CRUD
-- Create
INSERT INTO Usuarios (nombre_usuario, contraseña, rol)
VALUES ('nuevo_usuario', 'contraseña_encriptada', 'cajero');

-- Read
SELECT * FROM Usuarios WHERE id_usuario = 1;

-- Update
UPDATE Usuarios
SET rol = 'asesor'
WHERE id_usuario = 1;

-- Delete
DELETE FROM Usuarios WHERE id_usuario = 1;

-- Tablas de Sucursal

-- Sucursales CRUD
-- Create
INSERT INTO Sucursales (nombre_sucursal, ubicacion)
VALUES ('Sucursal Centro', 'Calle Principal 123');

-- Read
SELECT * FROM Sucursales WHERE id_sucursal = 'uuid_here';

-- Update
UPDATE Sucursales
SET ubicacion = 'Avenida Central 456'
WHERE id_sucursal = 'uuid_here';

-- Delete
DELETE FROM Sucursales WHERE id_sucursal = 'uuid_here';

-- Clientes CRUD
-- Create
INSERT INTO Clientes (nombre_cliente, direccion, tel_cliente, correo_cliente)
VALUES ('Juan Pérez', 'Calle 1 #234', '1234567890', 'juan@example.com');

-- Read
SELECT * FROM Clientes WHERE id_cliente = 'uuid_here';

-- Update
UPDATE Clientes
SET direccion = 'Avenida 2 #567', tel_cliente = '0987654321'
WHERE id_cliente = 'uuid_here';

-- Delete
DELETE FROM Clientes WHERE id_cliente = 'uuid_here';

-- Cuentas CRUD
-- Create
INSERT INTO Cuentas (id_cliente, tipo_cuenta, saldo, fecha_apertura, id_sucursal)
VALUES ('uuid_cliente', 'Ahorros', 1000.00, CURRENT_DATE, 'uuid_sucursal');

-- Read
SELECT * FROM Cuentas WHERE id_cuenta = 'uuid_here';

-- Update
UPDATE Cuentas
SET saldo = 1500.00, tipo_cuenta = 'Corriente'
WHERE id_cuenta = 'uuid_here';

-- Delete
DELETE FROM Cuentas WHERE id_cuenta = 'uuid_here';

-- Transacciones CRUD
-- Create
INSERT INTO Transacciones (id_cuenta, tipo_transaccion, monto, fecha, id_sucursal)
VALUES ('uuid_cuenta', 'Depósito', 500.00, CURRENT_DATE, 'uuid_sucursal');

-- Read
SELECT * FROM Transacciones WHERE id_transaccion = 'uuid_here';

-- Update
UPDATE Transacciones
SET monto = 600.00, tipo_transaccion = 'Retiro'
WHERE id_transaccion = 'uuid_here';

-- Delete
DELETE FROM Transacciones WHERE id_transaccion = 'uuid_here';


                        `}
                    </code></pre>
                </div>
            </section>


            <section className="sql-section">
                <h2 className="section-title">Procedimientos Almacenados</h2>
                <div className="mockup-code">
                    <pre><code className="language-sql">{`
-- Ejecuta usuario rol gerente

INSERT INTO Sucursales (id_sucursal, nombre_sucursal, ubicacion)
VALUES 
    (uuid_generate_v4(), 'Sucursal Norte', 'Avenida Norte 456, Ciudad B');

-- Ejecuta usuario rol asesor financiero
INSERT INTO Clientes (id_cliente, nombre_cliente, direccion, tel_cliente, correo_cliente)
VALUES 
    (uuid_generate_v4(), 'Juan Pérez', 'Calle Falsa 123, Ciudad A', '555-1234', 'juan.perez@email.com'),
    (uuid_generate_v4(), 'María López', 'Avenida Siempre Viva 456, Ciudad B', '555-5678', 'maria.lopez@email.com');

-- Obtener ids de cliente y sucursal, tienen permisos para hacerlo el cajero, asesor financiero y gerente.

SELECT id_cliente FROM Clientes WHERE nombre_cliente = 'Juan Pérez';
SELECT id_sucursal FROM Sucursales WHERE nombre_sucursal = 'Sucursal Centro';

-- Ejecuta en usuario con rol asesor financiero

INSERT INTO Cuentas (id_cuenta, id_cliente, tipo_cuenta, saldo, fecha_apertura, id_sucursal)
VALUES 
    (uuid_generate_v4(), 'id_cliente_de_juan', 'Ahorros', 0.00, CURRENT_DATE, 'id_sucursal_centro'),
    (uuid_generate_v4(), 'id_cliente_de_maria', 'Corriente', 0.00, CURRENT_DATE, 'id_sucursal_norte');


-- Para tabla transacciones usar function depositar y retiro para hacer transacciones. Usar rol cajero.

INSERT INTO Prestamos (id_prestamo, id_cliente, monto, tasa_interes, fecha_aprobacion, estado_prestamo)
VALUES 
    (uuid_generate_v4(), 'id_cliente_de_juan', 10000.00, 5.5, CURRENT_DATE, 'Aprobado'),
    (uuid_generate_v4(), 'id_cliente_de_maria', 20000.00, 4.8, CURRENT_DATE, 'Pendiente');


INSERT INTO Tarjetas_Credito (id_tarjeta, id_cliente, limite_credito, saldo_disponible, fecha_emision, estado)
VALUES 
    (uuid_generate_v4(), 'id_cliente_de_juan', 5000.00, 3000.00, CURRENT_DATE, 'Activa'),
    (uuid_generate_v4(), 'id_cliente_de_maria', 8000.00, 8000.00, CURRENT_DATE, 'Bloqueada');


INSERT INTO Atencion_Clientes (id_ticket, id_cliente, fecha_ticket, asunto, estado_ticket)
VALUES 
    (uuid_generate_v4(), 'id_cliente_de_juan', CURRENT_DATE, 'Problema con el pago', 'Abierto'),
    (uuid_generate_v4(), 'id_cliente_de_maria', CURRENT_DATE, 'Solicitud de cambio de dirección', 'Cerrado');

          `}</code></pre>
                </div>
            </section>

            <section className="sql-section">
                <h2 className="section-title">Instalacion de Database y Administrador-SQL</h2>
                <p>A modo de ejemplo podemos correr el sistema bancarío facilmente con Docker para simular servidores y su comunicación con el siguiente código yml </p>
                <div className="mockup-code">
                    <pre><code className="language-sql">{`-- Compose file para Docker (docker-compose.yml)

version: "3.9"
services:
  sistema_bancario_central:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: 12345
      POSTGRES_DB: CentralBanco
    ports:
      - 5432:5432
    logging:
      driver: none

  sistema_bancario_sucursal:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: 12345
      POSTGRES_DB: SucursalBanco
    ports:
      - 5433:5432
    logging:
      driver: none

      
  pgadmin:
    image: dpage/pgadmin4
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@gmail.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - 4321:80   
    logging:
      driver: none
`}</code></pre>
                </div>
            </section>

            <footer>
                <p>Documentación SQL - By Carlos Ramos.</p>
            </footer>
        </div>
    );
}

export default App;
